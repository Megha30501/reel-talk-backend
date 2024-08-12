const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
