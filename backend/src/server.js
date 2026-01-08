import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import noteRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;
const __dirname = path.resolve();

// Middleware to parse JSON
app.use(express.json());
//Middleware to handle cors
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}


// Rate Limiter
app.use(rateLimiter);

// Routes
app.use("/api/notes", noteRoutes);

//Static Files for production
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "frontend", "dist");
    app.use(express.static(frontendPath));
    //Handle all routes to index.html
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });


    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    })
} else {
    // Health Check for local development (moved here so it doesn't clash with production)
    app.get("/health", (req, res) => res.send("Server is up and running!"));
}


// The Startup Function
const startServer = async () => {
    try {
        // Connect to Database
        await connectDB();
        console.log("✅ MongoDB connected successfully");

        // Start listening once DB is confirmed
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`🚀 Server ready at http://127.0.0.1:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Startup Error:", error.message);
        // Instead of crashing, we log it so the terminal stays open
    }
};

startServer();