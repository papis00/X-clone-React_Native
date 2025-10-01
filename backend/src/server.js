import express from 'express'
import cors from "cors"
import { clerkMiddleware } from "@clerk/express"
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"

const app = express();

app.use(cors())
app.use(express.json())

app.use(clerkMiddleware());


app.get("/", (req,res) => res.send("hello from server"))

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// error handling middleware
app.use((err, req, res, next) => {
    console.log("Unhandled error:", err)
    res.status(500).json({ error: err.message || "Internal server error"})
})


const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => console.log("server is up and running on PORT:", ENV.PORT))       

    } catch (error) {
        console.error("Failed to start:", error.message)
        process.exit(1);
        
    }
}

startServer();

