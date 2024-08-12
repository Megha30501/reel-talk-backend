const express = require("express");
const app = express();

// Routes
const router = require("./routes/auth")

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
