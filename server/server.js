const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

// const cloudinary = require("cloudinary").v2;

// // cloudinary configuration

// cloudinary.config({
//   cloud_name: "testing-mctc-project",
//   api_key: "591627645258192",
//   api_secret: "38izIqLk7vqZhs9MLVGj3aRqBx0"
// });


app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));



////////

const db = require("./app/models");
db.sequelize.sync()
.then(() => {
  console.log("Database connected !")
})
.catch((err) => {
  console.log("error while connection to db",err)
})



// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
// //////

// simple route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to 'mi casa es tu casa' application. \n this is a GET route for test" });
});
////We also need to include routes in server.js (right before app.listen()):
require("./app/routes/users.routes")(app);
require('./app/routes/auth.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
