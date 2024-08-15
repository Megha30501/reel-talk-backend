const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRoute = require("./routes/auth");
const likeRoute = require("./routes/likes");
const movieRoute = require("./routes/movie");

app.use("/user", authRoute);
app.use("/likes", likeRoute);
app.use("/", movieRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
