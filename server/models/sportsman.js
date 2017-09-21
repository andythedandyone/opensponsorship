const mongose = require('mongoose');

const Schema = mongose.Schema;

const SportsMan = new Schema({
  personal: {
    name: {
      type: String,
      require: true
    },
    dob: {
      type: String,
      require: true
    },
    nationality: String,
    gender: String,
    marital: String,
    location: String,
  },
  interest: {
    drinks: String, // Alcohol
    interests: String,
    charities: [String],
    pets: String,
  },
  sports: {
    association: String,  //(e.g. NBA, NFL)
    team: String, // (e.g. New York Giants)
    sports: [String], // (Can Multiple)
  },
  about: String,
  socials: [], // Media Handles (Facebook, Twitter, Instagram, Youtube, Twitch, Snapchat);
  profilePic: String // (If you have time - S3 storage)
});


module.exports = mongose.model('Sportsman', SportsMan);
