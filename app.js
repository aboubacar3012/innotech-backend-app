const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const middleware = require("./src/utils/middleware");
const cors = require('cors')
require("./src/model/dbConnection");
const cors = require("cors");

const usersRouter = require("./src/routes/user.routes");
const stackRouter = require("./src/routes/stack.routes");
const campusRouter = require("./src/routes/campus.routes");
const batchRouter = require("./src/routes/batch.routes");
const authRouter = require("./src/routes/auth.routes");

const app = express();

<<<<<<< HEAD
app.use(cors());
=======
app.use(cors())
>>>>>>> 9eefc69bc9772f5d19b408f531a3f642ceced2a4
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(middleware.errorHandler);

app.use("/api/users", usersRouter);
app.use("/api/stacks", stackRouter);
app.use("/api/campus", campusRouter);
app.use("/api/batches", batchRouter);
app.use("/api/auth", authRouter);

app.use(middleware.unknownEndpoint);
module.exports = app;
