import * as z from "zod"


export const registerSchema = z.object({
    userName : z.string(),
    password : z.string(),
})


export const loginSchema = z.object({
    userName : z.string(),
    password : z.string(),
})