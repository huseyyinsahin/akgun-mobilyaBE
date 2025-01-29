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
    origin: ["https://akgunmobilya.com", "https://www.akgunmobilya.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use(require("./src/middlewares/authentication"));

app.use(require("./src/middlewares/queryHandler"));

/* ------------------------------------------------------- */

app.use("/upload", express.static("./upload"));

app.use("/", require("./src/routes/"));

app.all("/", (req, res) => {
  res.send({
    message: "Akgün Mobilya",
  });
});

/* ------------------------------------------------------- */

app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => console.log(PORT));
