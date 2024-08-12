const express = require('express');
const router = express.Router();

const {
    registerUser
} = require ("../controller/firebase-auth");


router.post("/register", registerUser);

module.exports = router;
