import {PrismaClient} from '@prisma/client';
import {DATABASE_URL} from '../config';

export const client = new PrismaClient({
  datasources: {
    db: {
      url: `${DATABASE_URL}?connection_limit=30&pool_timeout=5`,
    },
  },
  log: ['query', 'info', 'warn', 'error'],
});
export default client;
