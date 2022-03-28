import {
  applyResolversEnhanceMap,
  ResolversEnhanceMap,
} from '../../../../prisma/generated/type-graphql';
import { Authorized, Role } from '../role';

  type ResolverModelNames = keyof ResolversEnhanceMap;
const defaultAdminRole = [Authorized(Role.ADMIN)];
const resolverNames: ResolverModelNames[] = [
  'User',
];
const removeMutationRole = (key: ResolverModelNames) => ({
  [`create${key}`]: defaultAdminRole,
  [`createMany${key}`]: defaultAdminRole,
  [`update${key}`]: defaultAdminRole,
  [`updateMany${key}`]: defaultAdminRole,
  [`upsert${key}`]: defaultAdminRole,
  [`aggregate${key}`]: defaultAdminRole,
  [`delete${key}`]: defaultAdminRole,
  [`deleteMany${key}`]: defaultAdminRole,
});
const resolversEnhanceMap = resolverNames.reduce((accr, key) => {
  Object.assign(accr, { [key]: removeMutationRole(key) });
  return accr;
}, Object.create(null) as ResolversEnhanceMap);
applyResolversEnhanceMap(resolversEnhanceMap);
