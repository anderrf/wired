function searchUserByEmail(db, userEmail){
    return db.all(`
        SELECT * 
            FROM user
            WHERE userEmail = '${userEmail}'
            LIMIT 1;
    `);
}

module.exports = searchUserByEmail;