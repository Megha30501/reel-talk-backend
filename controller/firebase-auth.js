const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
} = require("../config/firebase");
const auth = getAuth();

// New User Registration

const registerUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      email: "Email is required",
      password: "Password is required",
    });
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const idToken = userCredential._tokenResponse.idToken;
      res.status(200).json({
        message: "User registered successfully!",
        uid: user.uid,
        idToken,
      });
    })
    .catch((error) => {
      const errorMessage =
        error.message || "An error occurred while registering the user";
      res.status(500).json({ error: errorMessage });
    });
};

// User Login

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      email: "Email is required",
      password: "Password is required",
    });
  }
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const idToken = userCredential._tokenResponse.idToken;
      if (idToken) {
        res.cookie("access_token", idToken, {
          httpOnly: true,
        });
        res
          .status(200)
          .json({ message: "User logged in successfully", idToken });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    })
    .catch((error) => {
      console.error(error);
      const errorMessage =
        error.message || "An error occurred while logging in";
      res.status(500).json({ error: errorMessage });
    });
};

// Update Password

const changePassword = (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({
      email: "Email is required",
      oldPassword: "Old password is required",
      newPassword: "New password is required",
    });
  }
  // Check if old and new passwords are the same
  if (oldPassword === newPassword) {
    return res
      .status(400)
      .json({ error: "New password must be different from the old password" });
  }
  signInWithEmailAndPassword(auth, email, oldPassword)
    .then((userCredential) => {
      const user = userCredential.user;

      updatePassword(user, newPassword)
        .then(() => {
          res.status(200).json({ message: "Password updated successfully" });
        })
        .catch((error) => {
          console.error("Error updating password:", error);
          res.status(500).json({ error: "Error updating password" });
        });
    })
    .catch((error) => {
      console.error("Error signing in:", error);
      res.status(500).json({ error: "Invalid email or password" });
    });
};

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
