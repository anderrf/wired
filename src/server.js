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
    .post('/cadastrar-usuario', pages.createUser);

//Determina a porta de execução do servidor
server.listen(5500);