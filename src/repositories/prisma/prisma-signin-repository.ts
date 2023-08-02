import { prisma } from "../../prisma";
import { SigninCreateData, SigninRepository } from "../signin-repository";

export class PrismaSigninRepository implements SigninRepository {
  async create({ name, email }: SigninCreateData) {
    const emails = await prisma.signined.findMany({
      where: {
        email,
      },
    });

    const useremail = emails[0];

    if (useremail == undefined) {
      await prisma.signined.create({
        data: {
          name,
          email,
          emailSent: false
        },
      });
    }

  }
}
