const {
  getAuth,
  createUserWithEmailAndPassword,
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

module.exports = {
  registerUser,
};
