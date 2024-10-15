import { prisma } from "../../db";
import crypto from "crypto";
import { sendOTP } from "../../services/mail";

interface UserDataProps {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profileImageURL: string;
  password: string;
  dob: string;
}

export const queryResolver = {
  verifyToken: async (parent: any, { token }: { token: string }) => {
    return token;
  },
};

export const mutationResolver = {
  createUser: async (parent: any, { firstName, email, dob, lastName }: any) => {
    const otp = crypto.randomInt(100000, 999999);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // const isVaild = await prisma.user.findFirst({
    //   where: {
    //     email,
    //   },
    // });

    // if (isVaild) {
    //   return "Email is already in use.";
    // }
    try {
      const user = await prisma.user.create({
        data: {
          firstName,
          email,
          dob,
          lastName,
        },
      });

      await prisma.oTP.create({
        data: {
          otp,
          user: user.id,
          expiresAt,
        },
      });
    } catch (error) {
      console.log(error);
    }
    await sendOTP(email, otp, firstName);
    return " OTP is sent to email address ";
  },
};
