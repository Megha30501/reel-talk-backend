const express = require("express");
const router = express.Router();

const { addLike, getLike } = require("../controller/likes");
const { varifyToken } = require("../middleware/auth");

router.post("/add-like", varifyToken, addLike);
router.get("/get-like", varifyToken, getLike);

module.exports = router;
