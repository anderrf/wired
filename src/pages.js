const session = require('express-session');
const Database = require('./database/db');
const saveUser = require('./database/saveUser');
const searchUserByEmail = require('./database/searchUserByEmail');
const saveComplaint = require('./database/saveComplaint');

module.exports = {
    index(req, res, session){
        if(!session){
            try{
                return res.render('index');
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            res.redirect('mapa');
        }
    },
    map(req, res, session){
        if(session){
            try{
                return res.render('map', {session});
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            try{
                return res.render('map');
            }
            catch(error){
                console.log(error);
            }
        }
    },
    logon(req, res, session){
        if(!session){
            try{
                return res.render('logon');
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            res.redirect('mapa');
        }
    },
    signup(req, res, session){
        if(!session){
            try{
                return res.render('signup');
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            res.redirect('mapa');
        }
    },
    complaint(req, res, session){
        if(session){
            try{
                return res.render('complaint', {session});
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            try{
                return res.render('complaint');
            }
            catch(error){
                console.log(error);
            }
        }
    },
    createComplaint(req, res, session){
        if(session){
            try{
                return res.render('createComplaint', {session});
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            res.redirect('entrar');
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
    },
    async activateLogon(req, res){
        const fields = req.body;
        if(Object.values(fields).includes('')){
            return res.send("Todos os campos devem ser preenchidos!");
        }
        try{
            const db = await Database;
            const result = await searchUserByEmail(db, fields.logEmail);
            const user = result[0];
            if(user.userEmail == fields.logEmail && user.userPassword == fields.logPassword){
                let session = req.session;
                session.userId = user.userId;
                session.userName = user.userName;
                return session;
            }
            else{
                res.send("Usuário ou senha inválidos!");
            }
        }
        catch(error){
            console.log(error);
            return res.send("Falha ao autenticar usuário!");
        }
    },
    async saveComplaint(req, res, session){
        const fields = req.body;
        if(Object.values(fields).includes('')){
            return res.send("Todos os campos devem ser preenchidos!");
        }
        try{
            if(session.userId){
                const db = await Database;
                await saveComplaint(db, {
                    complaintTitle: fields.complaintTitle,
                    complaintDesc: fields.complaintDesc,
                    complaintLat: fields.lat,
                    complaintLng: fields.lng,
                    creatorId: session.userId
                });
                return res.redirect('/mapa');
            }
        }
        catch(error){
            console.log(error);
            return res.send("O cadastro de problema não pôde ser realizado!");
        }
    }
}