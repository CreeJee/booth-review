import {PrismaClient} from '@prisma/client';

export interface GraphqlHttpContext {
    prisma: PrismaClient;
    user: Express.User
}
