function saveUser(db, user){
    return db.run(`
        INSERT INTO user (userName, userEmail, userPassword)
        VALUES ('${user.signupName}', '${user.signupEmail}', '${user.signupPassword}');
    `);
}

module.exports = saveUser;