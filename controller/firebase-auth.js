const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("../config/firebase");
const auth = getAuth();

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
      res.status(201).json({
        message: "User registered successfully!",
        uid: user.uid,
      });
    })
    .catch((error) => {
      const errorMessage =
        error.message || "An error occurred while registering the user";
      res.status(500).json({ error: errorMessage });
    });
};

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
          .json({ message: "User logged in successfully", userCredential });
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

module.exports = {
  registerUser,
  loginUser,
};
