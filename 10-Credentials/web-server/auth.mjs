import passport from 'passport';
import expressSession from 'express-session';

export default function (app) {
    passport.serializeUser( (user, done) => done(user.username) );
    passport.deserializeUser( (id, done) => {
        const user = {
            username : 'comp10302',
            firstname : 'Alexander',
            lastname : 'The Great',
        };
        done(null, user);
    });
    app.use(
        expressSession({
            secret : 'CRYPTOGRAPHICALLY SECURE STRING',
            resave : false,
            saveUninitialized : false,
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
}

