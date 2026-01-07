const jwt = require("jsonwebtoken")

// IMPORTANT: Add JWT_SECRET to your .env file:
// JWT_SECRET=your_secret_key_here_min_32_chars_long
// Generate a strong secret using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")

  if (!token) {
    return res.status(401).json({ message: "No token provided. Authorization denied." })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token." })
  }
}

module.exports = authMiddleware
