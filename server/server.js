const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db");
const router = require("./routes/index");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.status ? err.status : 500;
  res.status(status).json({ message });
});

connectDB("mongodb://127.0.0.1:27017/attendance-db")
  .then(() => {
    console.log("database connected");
    app.listen(4000, () => {
      console.log("App is lisening on port 4000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
