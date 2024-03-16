const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const connect = require("./database/mongo.db");

const port = process.env.PORT;

const app = express();
connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routers/user.router');

app.use('/',userRoutes);

const server = app.listen(port, () => {
  console.log(`server running at http://localhost:3001`);
});
