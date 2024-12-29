"use strict";

const express = require("express");
const app = express();
const cors = require("cors");

/* ------------------------------------------------------- */

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

require("express-async-errors");

/* ------------------------------------------------------- */

const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(require("./src/middlewares/authentication"));

app.use(require("./src/middlewares/queryHandler"));

/* ------------------------------------------------------- */

app.use("/upload", express.static("./upload"));

app.use("/", require("./src/routes/"));

/* ------------------------------------------------------- */

app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));
