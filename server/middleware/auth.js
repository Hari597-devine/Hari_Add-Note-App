// Auth Middleware — checks if the user is logged in before allowing access
// This runs before any protected route (like notes)

const jwt = require('jsonwebtoken'); // Library to verify JWT tokens

module.exports = function(req, res, next) {
  // Get the token from the request header (format: "Bearer <token>")
  const authHeader = req.headers['authorization'];

  // If no token is provided, block the request
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  // Extract the token part (remove "Bearer " prefix)
  const token = authHeader.split(' ')[1];

  // Verify the token is valid and not expired
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' }); // Token is invalid or expired

    req.user = decoded; // Attach user info (id, email, username) to the request
    next();             // Continue to the next route handler
  });
};
