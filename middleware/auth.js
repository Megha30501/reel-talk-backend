const { admin } = require("../config/firebase");

const varifyToken = async (req, res, next) => {
  const idToken = req.cookies.access_token || req.headers.authorization;
  if (!idToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Make sure this matches the expected structure
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { varifyToken };
