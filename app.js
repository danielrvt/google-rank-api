var grank = require('./controllers/grankCtrl');

var compress = require('koa-compress');
var logger = require('koa-logger');
var Router = require('koa-router');
var Koa = require('koa');

var app = new Koa();
var router = new Router();

// Logger
app.use(logger());

// Routes
router.get('/grank', grank.get);

// Compress
app .use(router.routes())
    .use(router.allowedMethods())
    .use(compress());

app.listen(8090);
