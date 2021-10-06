//Importa dependência do express
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
//Importa as páginas
const pages  = require('./pages');
//Executa o express
const server = express();

//Configurar session
const time = (1000*60*60*24);
server.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: time },
    resave: false
}));

server
    .use(express.json())
    .use(express.static(__dirname))
    .use(cookieParser());
var session;
const fakeEmail = "teste@teste.com";
const fakePassword = "testando";

//Rotas
server
    //utilizar body no req
    .use(express.urlencoded({extended: true}))
    //utilizando os arquivos estáticos
    .use(express.static('public'))
    //configurar template engine
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'hbs')
    //redirecionamento das rotas
    .get('/', pages.index)
    .get('/mapa', pages.map)
    .get('/entrar', pages.logon)
    .get('/cadastre-se', pages.signup)
    .get('/problema', pages.complaint)
    .get('/criar-problema', pages.createComplaint)
    .post('/cadastrar-usuario', pages.createUser)
    .post('/usuario-entrar', (req, res) => {
        if(req.body.logEmail == fakeEmail && req.body.logPassword == fakePassword){
            session = req.session;
            session.userId = req.body.logEmail;
            session.userName = req.body.logEmail;
            res.redirect('/mapa');
        }
        else{
            res.send("Usuário ou senha inválidos!");
        }
    });

//Determina a porta de execução do servidor
server.listen(5500);