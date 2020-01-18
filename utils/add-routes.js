const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = (router, next) => {
    const requestHandler = next.getRequestHandler();

    router.post('/register', async (ctx) => {
        const { name, email, password } = ctx.request.body;
        try {
            const user = await User.findOne({ email });
            if (user) {
                ctx.body = {
                    success: false,
                    errorMessage: 'Email already exists'
                };
                return;
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const newUser = await new User({ email, name, password: hash }).save();
            await ctx.login(newUser);
            ctx.body = { success: true };
        } catch (err) {
            //ToDo разобраться со статусом
            ctx.throw(500, err)
        }
    });

    router.post('/login', async (ctx) => {
        const { email, password } = ctx.request.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                ctx.body = {
                    success: false,
                    errorMessage: 'Email and/or password is not correct'
                }
                return;
                //ctx.throw(400, 'User with this email does not exist');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                await ctx.login(user);
                ctx.body = { success: true };
            } else {
                ctx.body = {
                    success: false,
                    errorMessage: 'Email and/or password is not correct'
                }
                //ctx.throw(400, 'Password is incorrect');
            }
        } catch (e) {
            console.log(e)
        }
    });

    router.post('/logout', async (ctx) => {
        await ctx.logout();
        ctx.body = { success: true };
    });

    router.get('/chat', async ctx=> {
        if (ctx.isAuthenticated()) {
            await next.render(ctx.req, ctx.res, '/chat', ctx.query);
            ctx.respond = false;
        } else {
            ctx.redirect('/');
        }
    });

    router.get(['/', '/signin', '/signup'], async ctx => {
        if (ctx.isUnauthenticated()) {
            await next.render(ctx.req, ctx.res, '/', ctx.query);
            ctx.respond = false;
        } else {
            ctx.redirect('/chat');
        }
    });

    router.all('*', async ctx => {
        await requestHandler(ctx.req, ctx.res);
        ctx.respond = false;
    })
    
}