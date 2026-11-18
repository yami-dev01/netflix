
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import { prisma } from "./db/index.js";

dotenv.config();

const app = new Hono();

const PORT = Number(process.env.PORT) || 8080;

app.use("*", cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

app.get("/", (c) => {
    return c.json({
        success: true,
        message: "Server is running"
    }, 200);
});

// api routing
import userRouter from "./routes/user.router.js";
import movieRouter from "./routes/movie.router.js";
import wishlistRouter from "./routes/wishlist.router.js";

app.route("/api/v1/user/", userRouter);
app.route("/api/v1/movie/", movieRouter);
app.route("/api/v1/wishlist/", wishlistRouter);

// Start server
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected");
        serve({
            fetch: app.fetch,
            port: PORT
        });
        console.log(`Server running on port ${PORT}`);

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
