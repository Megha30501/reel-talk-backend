const express = require("express");
const router = express.Router();

const { addLike } = require("../controller/likes");
const { varifyToken } = require("../middleware/auth");

router.post("/add-like", varifyToken, addLike);

module.exports = router;
