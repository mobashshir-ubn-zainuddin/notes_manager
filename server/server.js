// IMPORTANT: Before running this server, make sure you have:
// 1. Created a .env file in the server root directory
// 2. Added the following environment variables:
//    MONGODB_URI=your_mongodb_connection_string
//    JWT_SECRET=your_jwt_secret_key
//    PORT=5000
//    CLIENT_URL=http://localhost:3000

require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth")
const notesRoutes = require("./routes/notes")

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running." })
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
