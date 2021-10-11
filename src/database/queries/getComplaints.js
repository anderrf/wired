function getComplaints(db){
    return db.all(`
        SELECT * 
            FROM complaint;
    `);
}

module.exports = getComplaints;