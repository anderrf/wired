function saveComplaint(db, complaint){
    return db.run(`
        INSERT INTO complaint (complaintTitle, complaintDesc, complaintLat, complaintLng, creatorId)
        VALUES ('${complaint.complaintTitle}', '${complaint.complaintDesc}', ${complaint.complaintLat}, ${complaint.complaintLng}, ${complaint.creatorId});
    `);
}

module.exports = saveComplaint;