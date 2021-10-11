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
var session = null;

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
    .get('/', (req, res) => pages.index(req, res, session))
    .get('/mapa', (req, res) => pages.map(req, res, session))
    .get('/entrar', (req, res) => pages.logon(req, res, session))
    .get('/cadastre-se', (req, res) => pages.signup(req, res, session))
    .get('/problema', (req, res) => pages.complaint(req, res, session))
    .get('/criar-problema', (req, res) => pages.createComplaint(req, res, session))
    .post('/cadastrar-usuario', (req, res) => pages.createUser(req, res))
    .post('/registrar-problema', (req, res) => pages.saveComplaint(req, res, session))
    .post('/usuario-entrar', (req, res) => {
        session = pages.activateLogon(req, res);
        session.then(data => session = data);
        if(session.userId){
            res.redirect('mapa');
        }
        else{
            res.redirect('entrar');
        }
    })
    .get('/sair', (req, res) => {
        session = null;
        res.redirect('/');
    });

//Determina a porta de execução do servidor
server.listen(5500);