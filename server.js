const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// connect database
connectDB();

app.use(cors());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://contact-keeper-j10xlt0hg-nileshpratap.vercel.app"
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Init middleware
// extended: false to use simple json parser
// : true to use more powerful json parser
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json({ msg: "hi" });
});

//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// }

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
