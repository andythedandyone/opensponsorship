// console.log('this is index routes')
const mongoose = require('mongoose');
const Sportsman = require('../models/sportsman');
const nationality = require('country-query');
const express = require('express');
const router = express.Router();


router.get('/athletes', function (req, res, next) {
  console.log('GET ALL API');
  Sportsman.find({}, function(err, data) {
    if (err) {
      console.log(err);
      next(err)
    }
    res.json(data);
  });
});

router.post('/athletes', function(req, res, next) {
  var data = req.body;
  var newRegistration = new Sportsman({
    personal: {
      name: data.personal.name,
      dob: data.personal.dob,
      nationality: data.personal.nationality,
      gender: data.personal.gender,
      marital: data.personal.marital,
      location: data.personal.location,
    },
    interest: {
      drinks: data.interest.drinks, // Alcohol
      interests: data.interest.interests,
      charities: data.interest.charities,
      pets: data.interest.pets,
    },
    sports: {
      association: data.sports.association,  //(e.g. NBA, NFL)
      team: data.sports.team, // (e.g. New York Giants)
      sports: data.sports.sports, // (Can Multiple)
    },
    about: data.about,
    socials: data.socials, // Media Handles (Facebook, Twitter, Instagram, Youtube, Twitch, Snapchat);
    profilePic: data.profilePic // (If you have time - S3 storage)
  });
  console.log('--------------------------------------------------------')
  console.log(newRegistration)

  newRegistration.save(function(err, result) {
    if (err) {
      console.log('THERE WAS AN ERROR ', err)
      next(err);
    }
    console.log("Data Saved");
    res.status(201).json({data: result});
  })
});


router.get('/athlete/:name', function(req, res, next) {
  console.log('GET ONE API');
  var name = req.params.name;
  console.log(name)

  Sportsman.findOne({'name': new RegExp(name, 'i')}, function(err, player) {
    if (err) {
      console.log(err);
      next(err);
    };
    console.log(player.gender);
    res.json(player);
  });

});


router.put('/athlete/:id', function(req, res, next) {
  console.log('PUT DATA API');
  var userId = req.params.id
  var data = req.body;

  Sportsman.findById(userId, function(err, user) {

      // console.log(user)

      if(err) {
        console.log(err);
        next(err);
      } else {

        user.personal.name = data.personal.name;
        user.personal.dob = data.personal.dob;
        user.personal.nationality = data.personal.nationality;
        user.personal.gender = data.personal.gender;
        user.personal.marital = data.personal.marital;
        user.personal.location = data.personal.location;
        user.interestdrinks = data.interest.drinks; // Alcohol
        user.interest.interests = data.interest.interests;
        user.interest.charities = data.interest.charities;
        user.interest.pets = data.interest.pets;
        user.sports.association = data.sports.association;  //(e.g. NBA, NFL)
        user.sports.team = data.sports.team; // (e.g. New York Giants)
        user.sports.sports = data.sports.sports; // (Can Multiple)
        user.about = data.about;
        user.socials = data.socials; // Media Handles (Facebook, Twitter, Instagram, Youtube, Twitch, Snapchat);
        user.profilePic = data.profilePi; // (If you have time - S3 storage)
        user.save(function(err, resp) {
          console.log('data saved')
        })
      }


    // if (err) {
    //   console.log(err);
    //   next(err);
    // } else {
    //   console.log('data to change', user)

      // user = {
      //   personal: {
      //     name: data.personal.name,
      //     dob: data.personal.dob,
      //     nationality: data.personal.nationality,
      //     gender: data.personal.gender,
      //     marital: data.personal.marital,
      //     location: data.personal.location,
      //   },
      //   interest: {
      //     drinks: data.interest.drinks, // Alcohol
      //     interests: data.interest.interests,
      //     charities: data.interest.charities,
      //     pets: data.interest.pets,
      //   },
      //   sports: {
      //     association: data.sports.association,  //(e.g. NBA, NFL)
      //     team: data.sports.team, // (e.g. New York Giants)
      //     sports: data.sports.sports, // (Can Multiple)
      //   },
      //   about: data.about,
      //   socials: data.socials, // Media Handles (Facebook, Twitter, Instagram, Youtube, Twitch, Snapchat);
      //   profilePic: data.profilePic // (If you have time - S3 storage)
      // }

      // user.save(function (e, r) {
      //   console.log('UPDATED')
      //   res.status(200)
      // })
    // }
  })
})

//  Implement nationality auto completion
// router.get('/nationality', function(req, res, next) {
//   console.log("NATIONALITY");
//   console.log(req.query);
//   res.json(nationality.find('demonym', req.query.nation))
// })


module.exports = router;
