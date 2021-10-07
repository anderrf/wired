const Database = require('sqlite-async');

function execute(db){
    return db.exec(`
        CREATE TABLE IF NOT EXISTS user(
            userId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            userName VARCHAR(60) NOT NULL,
            userEmail VARCHAR(200) NOT NULL UNIQUE,
            userPassword VARCHAR(20) NOT NULL
        );
    `);
}

module.exports = Database.open(__dirname + './database.sqlite').then(execute);