"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutationResolver = exports.queryResolver = void 0;
const db_1 = require("../../db");
const crypto_1 = __importDefault(require("crypto"));
const mail_1 = require("../../services/mail");
exports.queryResolver = {
    verifyToken: (parent_1, _a) => __awaiter(void 0, [parent_1, _a], void 0, function* (parent, { token }) {
        return token;
    }),
};
exports.mutationResolver = {
    createUser: (parent_1, _a) => __awaiter(void 0, [parent_1, _a], void 0, function* (parent, { firstName, email, dob, lastName }) {
        const otp = crypto_1.default.randomInt(100000, 999999);
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
            const user = yield db_1.prisma.user.create({
                data: {
                    firstName,
                    email,
                    dob,
                    lastName,
                },
            });
            yield db_1.prisma.oTP.create({
                data: {
                    otp,
                    user: user.id,
                    expiresAt,
                },
            });
        }
        catch (error) {
            console.log(error);
        }
        yield (0, mail_1.sendOTP)(email, otp, firstName);
        return " OTP is sent to email address ";
    }),
};
