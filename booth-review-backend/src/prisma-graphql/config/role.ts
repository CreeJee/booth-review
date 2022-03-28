import { Authorized as typeGraphAuthorized } from 'type-graphql';

export enum Role {
  ADMIN = 0,
}
export const Authorized = (...roles: Role[]) => typeGraphAuthorized<Role>(...roles);
