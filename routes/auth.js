const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controller/firebase-auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/updatepassword", changePassword);

module.exports = router;
