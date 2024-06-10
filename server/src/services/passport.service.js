import { Strategy, ExtractJwt } from 'passport-jwt';
import prisma from "../models/index";

const users = prisma.user;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            const user = users.find({where: {id: payload.userId}});

            if (user) {
                return done(null, user);
            }

            return done(null, false);
        })
    );
};