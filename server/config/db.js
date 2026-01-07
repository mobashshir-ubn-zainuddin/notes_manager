// MongoDB Connection Configuration
// IMPORTANT: Add these environment variables to your .env file:
// MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notesapp?retryWrites=true&w=majority
// Replace 'username' with your MongoDB Atlas username
// Replace 'password' with your MongoDB Atlas password
// Replace 'cluster' with your actual cluster name
//
// How to get MongoDB URI:
// 1. Go to https://www.mongodb.com/cloud/atlas
// 2. Create a free account
// 3. Create a new cluster
// 4. Click "Connect" and copy the connection string
// 5. Replace <username> and <password> with your actual credentials

const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message)
    process.exit(1)
  }
}

module.exports = connectDB
