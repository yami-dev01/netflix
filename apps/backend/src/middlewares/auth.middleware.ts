import  jwt  from "jsonwebtoken"
import type { Context, Next } from "hono"
import { getCookie } from "hono/cookie"


export const verifyToken = async(c : Context, next : Next) =>{
    try{
        const token = getCookie(c , "acessToken")
        if(!token){
            return c.json({
                message : "you are not siggned in"
            }, 401)
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId : string};
        
        c.set("userId" , decoded.userId)
        await next();

    }catch(e){
        console.log(e)
        return c.json({
            message : "please login"
        },401)
    }
}