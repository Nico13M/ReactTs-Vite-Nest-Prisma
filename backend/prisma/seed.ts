import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Ajouter des utilisateurs dans la base de données
    const user1 = await prisma.user.upsert({
        where: { email: 'john.doe@example.com' },
        update: {},
        create: {
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'jane.doe@example.com' },
        update: {},
        create: {
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
        },
    });

    console.log({ user1, user2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
