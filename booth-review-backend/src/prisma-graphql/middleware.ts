import type { Request, Response } from 'express';
import { graphqlHTTP, Options } from 'express-graphql';
import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { APP_ORIGIN } from 'src/config';
import { GraphqlHttpContext } from 'src/interface/graphqlContext';
import { client } from 'src/lib/dbClient';
import { schema } from './config/schema';

passport.use(
  new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: APP_ORIGIN,

  }, (raw:Express.User, next) => {
    if (raw) {
      next(null, Object.assign(Object.create(null), raw));
    }
  }),
);
export type ExpressMiddleware = (req:Request, res: Response) => void;
export const gqlOption = (graphiql: boolean): Options => async (req) => {
  const request = req as Request;
  return {
    schema,
    context: {
      prisma: client,
      user: request.user,
      graphiql,
    } as GraphqlHttpContext,
    graphiql,
  };
};
export const graphqlHTTPWithConfig = (graphiql: boolean):ExpressMiddleware[] => [
  graphqlHTTP(gqlOption(graphiql)),
  passport.authenticate('jwt', {}),
];
