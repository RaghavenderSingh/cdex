import { PrismaClient as PrismaClient1 } from '@/prisma/generated/client1'
import { PrismaClient as PrismaClient2 } from '@/prisma/generated/client2'

const client1 = new PrismaClient1()
const client2 = new PrismaClient2()

const prismaClientSingleton = () => {
    return {
        db1: new PrismaClient1(),
        db2: new PrismaClient2()
    };
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// eslint-disable-next-line
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;