import 'reflect-metadata';
import express, {urlencoded, json} from 'express';
import {APP_PORT} from './config';
import cors from 'cors';
import {graphqlHTTPWithConfig} from './prisma-graphql/middleware';
const app = express();
app.use(cors({
  preflightContinue: true,
  origin: '*',
  optionsSuccessStatus: 200,
}));
app.use(urlencoded({extended: true}));
app.use(json());
app.use(graphqlHTTPWithConfig(false));
app.listen(APP_PORT, () => {
  console.log(`started-server PORT:${APP_PORT}`);
});
