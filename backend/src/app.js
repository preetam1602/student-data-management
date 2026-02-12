import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Correct ES Module dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

if (process.env.NODE_ENV === "production") {

    const frontendPath = path.join(__dirname, "../../frontend/dist");

    app.use(express.static(frontendPath));

    app.use((req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

export default app;
