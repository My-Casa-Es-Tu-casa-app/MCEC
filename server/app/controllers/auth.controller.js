const db = require("../models");
const config = require("../config/auth.config");
const Users = db.users;
//const Favourite_hosts = db.favourite_hosts;

//const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  Users.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    gender:req.body.gender,
    age:req.body.age,
    nationality:req.body.nationality,
    contact:req.body.contact
  })
    .then(()=>{
      res.send({ message: "User was registered successfully!" })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

/// catching the loged in user id 
global.connectedId = undefined
////
exports.signin = (req, res) => {
  Users.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      /////
      console.log('connectedId: ',connectedId)
      connectedId = user.id
      console.log('id stored: ',connectedId)
      ////
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
        gender: user.gender,
        age: user.age,
        room_space: user.room_space,
        guest_or_host: user.guest_or_host ,
        room_picture: user.room_picture,
        nationality : user.nationality,
        contact: user.contact ,
        profile_picture: user.profile_picture,
        status: user.status
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//// exporting the loged user id
//module.exports.thisUser = connectedId;

