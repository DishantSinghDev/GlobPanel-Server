"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSigninRepository = void 0;
const prisma_1 = require("../../prisma");
class PrismaSigninRepository {
    async create({ name, email }) {
        const emails = await prisma_1.prisma.signined.findMany({
            where: {
                email,
            },
        });
        const useremail = emails[0];
        if (useremail == undefined) {
            await prisma_1.prisma.signined.create({
                data: {
                    name,
                    email,
                    emailSent: false
                },
            });
        }
    }
}
exports.PrismaSigninRepository = PrismaSigninRepository;
