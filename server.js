const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// connect database
connectDB();

app.use(cors());

//Init middleware
// extended: false to use simple json parser
// : true to use more powerful json parser
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json();
});

//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
