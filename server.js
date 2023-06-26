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

const clearFiles = () => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      // Delete each file if it was saved before 5 min
      let savedTime = +filePath.substring(5, 18);
      const time = Date.now();

      if (savedTime + 3000000 < time) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return;
          }
          console.log(`File ${filePath} deleted successfully.`);
        });
      }
    });

    setTimer();
  });
};
const setTimer = () => {
  setTimeout(clearFiles(), 60000);
};

// upload for cloudinary example
// cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );
