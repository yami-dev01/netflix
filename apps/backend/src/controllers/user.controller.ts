
import type { Context } from "hono";
import { setCookie } from "hono/cookie";
import { prisma } from "../db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "@share/types";


export const register = async (c: Context) => {
    try {
        const body = await c.req.json();
        const parsedData = registerSchema.safeParse(body);

        if (!parsedData.success) {
            return c.json({
                message: parsedData.error.message
            }, 400);
        }

        const { userName, password } = parsedData.data;

        const alreadyExsist = await prisma.user.findFirst({
            where: {
                userName: userName
            }
        });

        if (alreadyExsist) {
            return c.json({
                message: "user already exsist with this name"
            }, 401);
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                userName: userName,
                password: hashPass
            }
        });

        const acessToken = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET!
        );

        setCookie(c, "acessToken", acessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        });

        return c.json({
            newUser
        }, 200);

    } catch (e) {
        console.log(e);
        return c.json({
            message: e instanceof Error ? e.message : "Something went wrong"
        }, 401);
    }
};


export const login = async (c: Context) => {
    try {
        const body = await c.req.json();
        const parsedData = loginSchema.safeParse(body);
        if (!parsedData.success) {
            return c.json({
                message: parsedData.error.message
            }, 400);
        }

        const { userName, password } = parsedData.data;

        const currUser = await prisma.user.findFirst({
            where: {
                userName: userName
            }
        });

        if (!currUser) {
            return c.json({
                message: "couldnt find this user"
            }, 404);
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            currUser.password
        );

        if (!isPasswordCorrect) {
            return c.json({
                message: "your password is incorrect"
            }, 400);
        }

        const { password: _, ...newUser } = currUser;
        const token = jwt.sign(
            { userId: currUser.id },
            process.env.JWT_SECRET!
        );

        setCookie(c, "acessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        });

        return c.json({
            newUser
        }, 200);

    } catch (e) {
        return c.json({
            message: "Something went wrong in signin"
        }, 500);
    }
};
