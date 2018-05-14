var grank = require('./middlewares/grank');
var Grank = require('./models/grankModel');

var compress = require('koa-compress');
var logger = require('koa-logger');
var Router = require('koa-router');
var Koa = require('koa');
var cors = require('koa2-cors');

var app = new Koa();

// CORS
app.use(cors({origin: "*"}));

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
