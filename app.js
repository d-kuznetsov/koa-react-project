//chrome://inspect/#devices
require('dotenv').config();

const Next = require('next');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const setUserSerialization = require('./utils/set-user-serialization');
const connectDB = require('./utils/connect-db');
const addRoutes = require('./utils/add-routes');

const dev = process.env.NODE_ENV !== 'production';
const next = Next({ dev });

next.prepare().then(() => {
    const koa = new Koa()
    const router = new Router();
    const port = process.env.PORT || 3000;

    koa.keys = ['secret key'];
    koa.use(session({}, koa));
    koa.use(bodyParser());
    
    setUserSerialization(passport);
    koa.use(passport.initialize());
    koa.use(passport.session());
    
    koa.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next();
    })

    addRoutes(router, next);
    koa.use(router.routes());

    connectDB();

    koa.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})