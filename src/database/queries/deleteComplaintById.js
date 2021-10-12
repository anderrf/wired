function deleteComplaintById(db, complaintId){
    return db.run(`
        DELETE FROM complaint
            WHERE complaintId = ${complaintId};
    `);
}

module.exports = deleteComplaintById;