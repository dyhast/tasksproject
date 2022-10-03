const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const urlencodedParser = express.urlencoded({extended: false});
const expressHbs = require('express-handlebars')
const hbs = require("hbs")
const select = require("./knex/autoriz_user");


//указание используемых шаблонов для простоения ХТМЛ страниц
app.engine(
    'hbs',
    expressHbs.engine({
        defaultLayout: 'main',
        extname: 'hbs',
        layoutsDir: (__dirname + '/views/layouts'),
        helpers: {
            tasksfunct: function() {
                return '<button visibility="hidden" form = "changetaskform" value = "'+ this.TaskId +'"><tr class="tasks row " style="display:flex; flex-direction:row; justify-content:space-between; width:100%; text-align:center">' +
                    '<td class="task header" style="padding: 0pt 2pt 0pt 2pt; border: 2px ridge black; width: 8%; text-align: center; word-wrap:break-word; color:'+ this.textcolor + ';">' +
                     this.TaskHeader +
                    '</td><td class="task descript" style="padding: 0pt 2pt 0pt 2pt; border: 2px ridge black; width: 29%; text-align: center; word-wrap:break-word;">'+
                    this.TaskDescription +
                    '</td><td class="task end date" style="padding: 0pt 2pt 0pt 2pt; border: 2px ridge black; width: 7%; text-align: center; word-wrap:break-word;">' +
                    this.TaskEndDate +
                    '</td><td class="task create date" style="padding: 0pt 2pt 0pt 2pt; border: 2px ridge black; width: 7%; text-align: center; word-wrap:break-word;">' +
                    this.TaskCreateDate +
                    '</td><td class="task upd date" style="padding: 0pt 2pt 0pt 2pt; border: 2px ridge black; width: 7%; text-align: center; word-wrap:break-word;">' +
                    this.TaskUpdDate +
                    '</td><td class="task prior" style="padding: 0pt 2pt 0pt 2pt; border: 2px ridge black; width: 5%; text-align: center;word-wrap:break-word;">' +
                    this.TaskPrior +
                    '</td><td class="task status" style="padding: 0pt 2pt 0pt 2pt; border: 2px ridge black; width: 7%; text-align: center; word-wrap:break-word;">' +
                    this.TaskStatus +
                    '</td><td class="task creator" style="padding: 0pt 2pt 0pt 2pt; border: 2px ridge black; width: 15%; text-align: center; word-wrap:break-word;">' +
                    this.creatorname +
                    '</td><td class="task worker" style="padding: 0pt 2pt 0pt 2pt; border: 2px ridge black; width: 15%; text-align: center; word-wrap:break-word;">' +
                    this.workername +
                    '</td></tr></button>';
            }
        }
    })

);
app.set('views', './views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

//Редирект на страницу авторизации, если она не пройдена
app.get('/', (request, response) => {
    response.redirect('http://localhost:3000');
})

//Проверка пришедших из формы авторизации данных
app.post("/", urlencodedParser, async function (request, response){
    let login = request.body.login;
    let pass = request.body.pass;
    let addr = request.body.addr;
    console.log('login:'+login);
    console.log('pass:'+pass);
    console.log('addr:'+addr);
    function getuser(login) {
        let select = require('./knex/autoriz_user.js');
        let result =  select.selectuser(login);
        return result;
    }
        let user = await getuser(login);
        user = user[0];
        if (user !== undefined)
        {
            if (user.UserPass == pass)
            {
                global.Glogin = login;
                global.FName = user.UserFName;
                global.UserId = user.UserId;
                console.log('global login ' + global.Glogin);
                response.redirect('http://localhost:3001/TasksPage');
                //alert('пароль');
            }else
            {
                response.redirect('http://localhost:3000/alerts/BadPass.html');
                //alert('Неверный пароль!');
            }
        }else{
            response.redirect('http://localhost:3000/alerts/noUser.html');
            //alert('Такого пользователя не существует!');
        }
        if(!request.body) return response.sendStatus(400);

})

//Отображение страницы задач после авторизации
app.get('/TasksPage', async function(request, response) {
    if (global.Glogin == undefined)
    {
        response.redirect('http://localhost:3000');
    }
    let UserId=global.UserId;
    function getusertasks(UserId) {
        let select = require('./knex/autoriz_user.js');
        let result =  select.usertasks(UserId);
        return result;
    }

    function getuser(UserId) {
        let select = require('./knex/autoriz_user.js');
        let result =  select.getuser(UserId);
        return result;
    }

    let tasks = await getusertasks(UserId);

    for (let key in tasks) {
        let datetask = +new Date(tasks[key].TaskEndDate)
        let creatorid = tasks[key].TaskCreatorId;
        let creatorname = await getuser(creatorid);
        creatorname = creatorname[0];
        if (creatorname.UserSName==null){
            creatorname.UserSName = ' ';
        }
        creatorname = creatorname.UserFName + ' ' + creatorname.UserSName;

        let workerid = tasks[key].TaskWorkerId;
        let workername = await getuser(workerid);
        workername = workername[0];
        if (workername.UserSName==null){
            workername.UserSName = ' ';
        }
        workername = workername.UserFName + ' ' + workername.UserSName;
        tasks[key].creatorname = creatorname;
        tasks[key].workername = workername;
        if (tasks[key].TaskStatus == 'Выполнена'){
            tasks[key].textcolor = 'green';
        }else{
            let nowdate = +new Date();
            if (nowdate>datetask){
                tasks[key].textcolor = 'red';
            }
        }
        creatorname = '';
        workername = '';
    }

    let date = new Date();
    response.render("home", {
        title: "Мои задачи",
        loginuser: 'Здравствуйте ' + global.FName,
        currdate: date.toLocaleDateString(),
        task: tasks,
        IdUser: UserId
    });
    //response.send(__dirname + '/public/Tasks.html');
    //[{header:'', descript: '', taskenddate:'', taskcreatedate:'', taskupddate:'', taskprior:'', taskstatus:'', taskcreator:'', taskworker:''}]

})

//страница задач при получении команд на сортировку
app.post("/TasksPage", urlencodedParser, async function (request, response) {
    let UserId=global.UserId;

    if (request.body.FilterDate !== undefined) {
            var SortDate = request.body.FilterDate;
            switch (SortDate) {
                case 'today':
                    SortDate = new Date();
                    SortDate.setHours(23, 59, 59, 0);
                    SortDate = +new Date(SortDate);
                    break;
                case 'week':
                    let SortDateyear = new Date().getFullYear();
                    let SortDatemonth = new Date().getMonth();
                    let SortDateday = new Date().getDate();
                    SortDateday += 7;
                    SortDate = +new Date(SortDateyear, SortDatemonth, SortDateday, 23, 59, 59, 0);
                    break;
                case 'more':
                    response.redirect('http://localhost:3001/TasksPage');
                    break;
            }
        var tasks = await getusertasks(UserId);

    }else if(request.body.BossTasks == 'boss'){
        tasks = await bossusertasks(UserId);
    }else if(request.body.UpdateSort == 'updatesort'){
        tasks = await getupdtasks(UserId);
    }




    function getusertasks(UserId) {
        let select = require('./knex/autoriz_user.js');
        let result =  select.usertasks(UserId);
        return result;
    }

    function bossusertasks(UserId) {
        let select = require('./knex/autoriz_user.js');
        let result =  select.bossusertasks(UserId);
        return result;
    }

    function getuser(UserId) {
        let select = require('./knex/autoriz_user.js');
        let result =  select.getuser(UserId);
        return result;
    }

    function getupdtasks(UserId) {
        let select = require('./knex/autoriz_user.js');
        let result =  select.getupdtasks(UserId);
        return result;
    }


    let mydatemass=[];
    for (let key in tasks) {
        let datetask = +new Date(tasks[key].TaskEndDate)
        let creatorid = tasks[key].TaskCreatorId;
        let creatorname = await getuser(creatorid);
        creatorname = creatorname[0];
        if (creatorname.UserSName==null){
            creatorname.UserSName = ' ';
        }
        creatorname = creatorname.UserFName + ' ' + creatorname.UserSName;

        let workerid = tasks[key].TaskWorkerId;
        let workername = await getuser(workerid);
        workername = workername[0];
        if (workername.UserSName==null){
            workername.UserSName = ' ';
        }
        workername = workername.UserFName + ' ' + workername.UserSName;
        tasks[key].creatorname = creatorname;
        tasks[key].workername = workername;
        if (tasks[key].TaskStatus == 'Выполнена'){
            tasks[key].textcolor = 'green';
        }else{
            let nowdate = +new Date();
            if (nowdate>datetask){
                tasks[key].textcolor = 'red';
            }
        }
        creatorname = '';
        workername = '';
        if (request.body.FilterDate !== undefined) {
            if (SortDate>=datetask)
            {
                mydatemass.push(tasks[key]);
            }
        }else if(request.body.BossTasks == 'boss'){
            mydatemass.push(tasks[key]);
        }else if(request.body.UpdateSort == 'updatesort'){
            mydatemass.push(tasks[key]);
        }
    }
    tasks = mydatemass;
    let date = new Date();
    response.render("home", {
        title: "Мои задачи",
        loginuser: 'Здравствуйте ' + global.FName,
        currdate: date.toLocaleDateString(),
        task: tasks,
        IdUser: UserId
    });

})

//Редирект на страницу авторизации
app.get('/EditTaskPage', (request, response) => {
    response.redirect('http://localhost:3000');
})

//Страница создания новой задачи
app.post("/EditTaskPage", urlencodedParser, async function (request, response){
    if (request.body.IdTask == 0)
    {
        let TaskId = request.body.IdTask;
        let UserId = global.UserId;
        var WorkerName = ' ';
        function getuser(UserId) {
            let select = require('./knex/autoriz_user.js');
            let result =  select.getuser(UserId);
            return result;
        }
        let CurrentUser = await getuser(UserId);
        CurrentUser = CurrentUser[0];
        let WorkersId = CurrentUser.UserWorkers;
        let CurrentName = CurrentUser.UserFName + ' ' + CurrentUser.UserSName;
        let CurrentWorker = await getuser(WorkersId);
        CurrentWorker = CurrentWorker[0];
        console.dir(CurrentWorker);
        if (CurrentWorker == undefined){
            WorkerName = CurrentWorker.UserFName + ' ' + CurrentWorker.UserSName;
        }
        let date = new Date();
        response.render("EditTask", {
            loginuser: 'Здравствуйте ' + global.FName,
            currdate: date.toLocaleDateString(),
            IdUser: UserId,
            IdWorker: WorkersId,
            WorkerName: WorkerName,
            CurrentName: CurrentName,
            IdTask: TaskId
        });

    }

})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
