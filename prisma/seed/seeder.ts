import { Prisma, PrismaClient } from "@prisma/client";
import { argv } from "bun";

const prisma = new PrismaClient()

async function main() {
    const createRoleOwner = await prisma.role.upsert({
        where: {
            id: 1
        },
        create: {
            roleName: "owner"
        },
        update: {

        }
    }) 

    const createRoleUser = await prisma.role.upsert({
        where: {
            id: 2
        },
        create: {
            roleName: "user"
        },
        update: {

        }
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})