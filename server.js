const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const { v2: cloudinary } = require("cloudinary");
const app = express();
const path = require("path");
const fs = require("fs");

const folderPath = "./uploads";

// connect database
connectDB();

app.use(cors());

cloudinary.config({
  cloud_name: "dddk1nplv",
  api_key: "755943353645926",
  api_secret: "OcKxo6iLWZgWpbIpUYGAcdDkyo0",
});

// app.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://contact-keeper-omega.vercel.app/"
//   ); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

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

// delete uploads every 6hours and recreate it
setInterval(() => {
  // deleter the uploads folder
  fs.rmdir(folderPath, { recursive: true }, (error) => {
    if (error) {
      console.error("Error deleting folder:", error);
    } else {
      console.log("Folder deleted successfully.");
    }
  });
  // create again
  fs.mkdir(folderPath, { recursive: true }, (error) => {
    if (error) {
      console.error("Error creating folder:", error);
    } else {
      console.log("Folder created successfully.");
    }
  });
}, 6 * 60 * 60 * 1000);

// upload for cloudinary example
// cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );
