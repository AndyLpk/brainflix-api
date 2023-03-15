const express = require("express");
const app = express();
const videosRoutes = require("./routes/videos");
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 7500;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static("public/images"));


app.use("/videos", videosRoutes);

app.listen(port, () => {
    console.log(`Express demo listening on port ${port}`);
});