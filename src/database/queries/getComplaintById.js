function getComplaintById(db, complaintId){
    return db.get(`
        SELECT * 
            FROM complaint
            WHERE complaintId = ${complaintId};
    `);
}

module.exports = getComplaintById;