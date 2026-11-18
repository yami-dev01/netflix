import { Hono } from "hono";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { discover , getMovieById, getTrendingMovies, getOnlyMovies, WebSeries } from "../controllers/movies.controller.js";

const router = new Hono()


router.get("/discover" , verifyToken , discover);
router.get("/details/:movieId" , verifyToken , getMovieById)
router.get("/trending" , verifyToken , getTrendingMovies);
router.get("/movies", verifyToken, getOnlyMovies);
router.get("/series", verifyToken, WebSeries);

export default router