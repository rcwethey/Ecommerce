import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from '../Config/redis';
import { SESSION_SECRET } from './config.json';

const RedisStore = connectRedis(session);

const SevenYears = 1000 * 60 * 60 * 24 * 7 * 365

export const sessionConfig = session({
 store: new RedisStore({
  client: redis,
 }),
 name: "qid",
 resave: false,
 rolling: true,
 saveUninitialized: false,
 secret: SESSION_SECRET,
 cookie: {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  maxAge: SevenYears
 }
})

