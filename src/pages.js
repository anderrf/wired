module.exports = {
    index(req, res){
        try{
            return res.render('index');
        }
        catch(error){
            console.log(error);
        }
    },
    map(req, res){
        try{
            return res.render('map');
        }
        catch(error){
            console.log(error);
        }
    },
    logon(req, res){
        try{
            return res.render('logon');
        }
        catch(error){
            console.log(error);
        }
    },
    signup(req, res){
        try{
            return res.render('signup');
        }
        catch(error){
            console.log(error);
        }
    },
    complaint(req, res){
        try{
            return res.render('complaint');
        }
        catch(error){
            console.log(error);
        }
    },
    createComplaint(req, res){
        try{
            return res.render('createComplaint');
        }
        catch(error){
            console.log(error);
        }
    }
}