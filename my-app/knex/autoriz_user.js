const knex = require('./knex.js');

function selectuser (login) {
    return knex('UsersTable').where('UserLogin', login).column('UserId', 'UserLogin', 'UserPass', 'UserFName', 'UserSName').select().orderBy('UserId').then(function (trx) {
        //console.dir(trx);
        return trx;
    })
}

function usertasks (UserId) {
    return knex('TasksTable').where('TaskCreatorId', UserId).orWhere('TaskWorkerId', UserId).select('*').orderBy('TaskId').then(function (trx) {
        //console.dir(trx);
        return trx;
    })
}

function getupdtasks (UserId) {
    return knex('TasksTable').where('TaskCreatorId', UserId).orWhere('TaskWorkerId', UserId).select('*').orderBy('TaskUpdDate').then(function (trx) {
        //console.dir(trx);
        return trx;
    })
}

function bossusertasks (UserId) {
    return knex('TasksTable').where('TaskCreatorId', UserId).select('*').orderBy('TaskWorkerId').then(function (trx) {
        //console.dir(trx);
        return trx;
    })
}

function getuser(UserId) {
    return knex('UsersTable').where('UserId', UserId).select('*').orderBy('UserId').then(function (trx) {
        //console.dir(trx);
        return trx;
    })
}


module.exports = {
    selectuser: selectuser,
    usertasks: usertasks,
    getuser: getuser,
    bossusertasks:bossusertasks,
    getupdtasks: getupdtasks
};




//console.log(rez);
/*
knex.transaction(function (trx) {
        trx.select('UserLogin').from('UsersTable').then(trx.commit).catch(trx.rollback);
    }).then(function (trx) {
        //console.dir(trx);
        rez = 1;
    //console.log(rez);
        return trx;
    }).catch(function (error) {
        rez = 2;
        console.error(error);

    });
*/
//console.log(rez);
//console.dir(dfg);
