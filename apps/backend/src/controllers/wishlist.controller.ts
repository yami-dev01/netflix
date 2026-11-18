import type { Context } from "hono";
import { prisma } from "../db/index.js";


export const addToWishlist = async(c : Context) => {
    try{
        const movieId = Number(c.req.param("movieId"));
        if(!movieId){
            return c.json({
                data : "please provide movie id"
            }, 401)
        }

        const userId = Number(c.get("userId"));
        if(!userId){
            throw new Error("please sign in")
        }

        const addMovieToWishlist = await prisma.wishlist.create({
            data : {
                userId : userId,
                movieId : movieId
            }
        })

        return c.json({
            message : "added to wishlist",
            data : addMovieToWishlist
        }, 200)


    }catch(e){
        console.log(e);
        return c.json({
            message : "couldnt add to wishlist"
        }, 500)
    }
}

export const deleteFromWishlist = async(c : Context) => {
    try{
        const movieId = Number(c.req.param("movieId"));

        if (!Number.isInteger(movieId)) {
            return c.json({
                message: "Please provide a valid movie ID"
            }, 400);
        }

        const userId : number = Number(c.get("userId"));

        if (!Number.isInteger(userId)) {
            return c.json({
                message: "Please sign in"
            }, 401);
        }

        const movieExists = await prisma.wishlist.findFirst({
            where: {
                userId,
                movieId
            }
        });

        if (!movieExists) {
            return c.json({
                message: "Movie not found in your wishlist"
            }, 404);
        }

        await prisma.wishlist.delete({
            where: {
                id: movieExists.id
            }
        });

        return c.json({
            message: "Movie removed from wishlist successfully"
        }, 200);

    }catch(e){
        console.error(e);
        return c.json({
            message: "Couldn't remove movie from wishlist"
        }, 500);
    }
}


export const moviesFromWishList = async(c : Context) => {
    try{
        
        const userId = Number(c.get("userId"));
        if(!userId){
            throw new Error("please sign in")
        }

        const wishlistMovies = await prisma.wishlist.findMany({
            where : {
                userId : userId
            }
        })

        return c.json({
            wishlistMovies
        }, 200)


    }catch(e){
        console.log(e);
        return c.json({
            data : "couldnt fetch movies from your wishlist"
        }, 500)
    }
}
