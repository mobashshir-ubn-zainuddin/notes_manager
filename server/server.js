// IMPORTANT: Before running this server, make sure you have:
// 1. Created a .env file in the server root directory
// 2. Added the following environment variables:
//    MONGODB_URI=your_mongodb_connection_string
//    JWT_SECRET=your_jwt_secret_key
//    PORT=5000
//    CLIENT_URL=http://localhost:3000

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })
// Log whether critical env vars are present (do not print secrets)
console.log('JWT_SECRET set:', !!process.env.JWT_SECRET)
console.log('MONGODB_URI set:', !!process.env.MONGODB_URI)
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth")
const notesRoutes = require("./routes/notes")

const app = express()

// Connect to MongoDB
connectDB() 

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  console.log('Headers:', req.headers)
  next()
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)

// Debug: List all registered routes
console.log('Registered routes:')
app._router.stack.forEach((middleware, index) => {
  if (middleware.route) {
    console.log(`${index}: ${middleware.route.stack[0].method.toUpperCase()} ${middleware.route.path}`)
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler, handlerIndex) => {
      if (handler.route) {
        console.log(`${index}-${handlerIndex}: ${handler.route.stack[0].method.toUpperCase()} ${handler.route.path}`)
      }
    })
  }
})

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running." })
})

// Catch-all route for debugging
app.use((req, res, next) => {
  console.log(`Unhandled request: ${req.method} ${req.url}`)
  console.log('Headers:', req.headers)
  res.status(404).json({ message: `Route not found: ${req.method} ${req.url}` })
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
