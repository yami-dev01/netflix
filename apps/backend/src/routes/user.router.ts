import { Hono } from "hono";
import { register, login } from "../controllers/user.controller.js";

const router = new Hono();

router.post("/signup", register);
router.post("/signin", login);

export default router;