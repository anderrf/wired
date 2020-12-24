//Importa dependência do express
const express = require('express');
const path = require('path');
//Importa as páginas
const pages  = require('./pages');
//Executa o express
const server = express();

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
    .get('/criar-problema', pages.createComplaint);

//Determina a porta de execução do servidor
server.listen(5500);