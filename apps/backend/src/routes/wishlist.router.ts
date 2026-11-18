import { Hono } from "hono";
import { addToWishlist, deleteFromWishlist, moviesFromWishList } from "../controllers/wishlist.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = new Hono();

router.post("/add/:movieId", verifyToken, addToWishlist);
router.delete("/remove/:movieId", verifyToken, deleteFromWishlist);
router.get("/" , verifyToken , moviesFromWishList)

export default router

