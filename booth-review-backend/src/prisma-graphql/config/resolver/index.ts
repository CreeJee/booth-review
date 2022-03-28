import {NonEmptyArray} from 'type-graphql';
import {resolvers as generatedResolvers} from '../../../../prisma/generated/type-graphql';

import './applyResolverEffect';

export const customizedResolvers = [
  ...generatedResolvers,
] as NonEmptyArray<Function>;
export default customizedResolvers;
