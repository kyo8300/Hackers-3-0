const express = require("express");
const app = express();
const connectDB = require("./config/db");
// const mockData = require('./config/mockdata');
const path = require("path");

// Cennect Database
connectDB();

//mockData();

//Init middleware
app.use(express.json({ extended: false }));

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/communities", require("./routes/api/communities"));
app.use("/api/profiles", require("./routes/api/profiles"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
