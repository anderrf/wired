const Database = require('sqlite-async');

function execute(db){
    return db.exec(`
        CREATE TABLE IF NOT EXISTS user(
            userId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            userName VARCHAR(60) NOT NULL,
            userEmail VARCHAR(200) NOT NULL UNIQUE,
            userPassword VARCHAR(20) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS complaint(
            complaintId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            complaintTitle VARCHAR(60) NOT NULL,
            complaintDesc VARCHAR(200) NOT NULL,
            complaintLat DOUBLE NOT NULL,
            complaintLng DOUBLE NOT NULL,
            creatorId INTEGER NOT NULL,
            CONSTRAINT FK__creatorId FOREIGN KEY (creatorId) REFERENCES user(userId)
        );
    `);
}
module.exports = Database.open(__dirname + './database.sqlite').then(execute);