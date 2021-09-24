const Database = require('./database/db');
const saveUser = require('./database/saveUser');

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
    },
    async createUser(req, res){
        const fields = req.body;
        if(Object.values(fields).includes('')){
            return res.send('Todos os campos devem ser preenchidos!');
        }
        if(fields.signupPassword !== fields.signupEqualPassword){
            return res.send('As senhas digitadas devem ser idênticas!');
        }
        try{
            const db = await Database;
            await saveUser(db, {
                signupName: fields.signupName,
                signupEmail: fields.signupEmail,
                signupPassword: fields.signupPassword
            });
            return res.redirect('/mapa');
        }
        catch(error){
            console.log(error);
            return res.send("O cadastro de usuário não pôde ser realizado!");
        }
    }
}