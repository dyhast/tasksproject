const knex = require('../knex.js');


knex.transaction(function (trx){
    return trx.insert({UserFName:'lkdgfj;l', UserLogin: 'sfghsggsh', UserPass: '43w5h45h'}).into('UsersTable').then(trx.commit).catch(trx.rollback);
}).then(function (inserts){
    console.log(inserts.length + 'transaction work!');
}).catch(function (error){
    console.error(error);
})