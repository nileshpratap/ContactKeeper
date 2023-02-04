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

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json();
});

//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
