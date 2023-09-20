const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/categories");
const itemRoute = require("./routes/item");
const blogRoute = require("./routes/blog");
const optionRoute = require("./routes/option");
const filterRoute = require("./routes/filter");
const adminAuthRoute = require("./routes/adminAuth");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/item", itemRoute);
app.use("/api/blog", blogRoute);
app.use("/api/option", optionRoute);
app.use("/api/adminAuth", adminAuthRoute);
app.use("/api/filter", filterRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = {
  app,
};
