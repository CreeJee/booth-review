import { buildSchemaSync } from 'type-graphql';
import { authChecker } from './authChecker';
import { customizedResolvers } from './resolver';

export const schema = buildSchemaSync({
  resolvers: customizedResolvers,
  emitSchemaFile: false,
  authChecker,
});
export default { schema };
