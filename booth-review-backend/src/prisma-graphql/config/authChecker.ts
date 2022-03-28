import { AuthChecker } from 'type-graphql';
import { GraphqlHttpContext } from '../../interface/graphqlContext';

export const authChecker: AuthChecker<GraphqlHttpContext> = (
  // _root, _args, context, info,
  resolverData,
  roles,
) => {
  const { context } = resolverData;
  if (context.user) {
    return true;
  }
  if (roles.length === 0) {
    return true;
  }
  return false;
};
export default authChecker;
