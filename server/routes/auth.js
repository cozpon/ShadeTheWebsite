const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const saltRounds = 12;
const router = express.Router();
const sendmail = require('../config/mailer.js');

const db = require('../models');
const User = db.user;
const Status = db.status;


router.post('/login',
  passport.authenticate('local'), (req, res) => {
  return res.json({
    id: req.user.id,
    username: req.user.username,
    success: true
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  console.log('user logged out');
  res.sendStatus(200);
});

router.post('/register', (req, res) => {
  const { email, username } = req.body;
  return User.findOne({
    where: { $or : [{ username: username }, { email: username }] }, // lets client login with username or email
    attributes: { exclude: ['password'] }
  })
  .then(userDetails => {
    if(userDetails){ // if user does not exist, findOne will return null
      res.json({  // if user does exist, user details will be returned
        error: 'sorry, that username/email is already in use!'
      });
    } else { // if there is no user already with the details, register the new user
        bcrypt.genSalt(saltRounds, function(err, salt){
          bcrypt.hash(req.body.password, salt, function(err, hash){
            User.create({
              username: username,
              password: hash,
              email: email
            })
            .then((user) => {
              return res.json({
                username: user.username,
                password: user.password,
                email: user.email,
                success: true
              });
            });
          });
        });
      }
    })
  .catch((err) => {
    console.log("error", err);
    return res.json({
      error : 'Oh no! Something went wrong!'
    });
  });
});

//FORGOT password
router.post('/forgot', (req, res) => {
  return User.findOne({ where : { email: req.body.email } })
  .then(user => {
    crypto.randomBytes(20, function(err, buf) { //creates random TOKEN
      let token = buf.toString('hex');
      let client = nodemailer.createTransport({ //sets up nodemailer
          service: 'SendGrid',
          auth: {
            user: sendmail.user, // username & password stored in config/mailer.js
            pass: sendmail.pass  // hidden with .gitignore so as not to push up sensitive details
          }
        });
      let email = {
        to: req.body.email, // sends email to data input
        from: 'passwordreset@shadetheapp.com', //from us
        subject: 'Shade. Mobile App Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          "It's no big deal, you forgot your password. Happens all the time, really.\n\n" +
          'Please click on the following link, or paste this into your browser:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' + // this link be from server side, req.headers.host can be our website html
          'If you did not request this, someone forgot a lot more than their password! \n\n' +
          'Simply ignore this email and your password will remain unchanged.\n'
        }; // ^^ rewrite the "text" and make it more specific // customized
      client.sendMail(email, function(err, info){ //
        if(err){
          console.log(err);
        }
        else {
        console.log('Message sent: ' + info.response);
        req.flash('info', 'An e-mail has been sent to ' + req.body.email + ' with further instructions.');
        } // req.flash meant for express-flash
      })
      return user.update({ // sends the token + expiration date to the user DB
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000 // 1 hour
      })
    })
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  });
});

router.put('/reset/:token', (req, res) => {
  return User.findOne({
    where : { resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()} }
  })
  .then(user => { // find the user who has the resetPasswordToken attached to them & whose token hasn't expired.
    if (!user) { // if there is no user, return error and redirect to /forgot
      //req.flash('error', 'Password reset token is invalid or has expired.');
    return console.log("error");
    }
    else {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          user.update({
            resetPasswordToken: null,
            resetPasswordExpires: null,
            password: hash
          })
          .then(newPassword => {
            console.log('Password updated');
            return res.json({
              success : true
            });
          });
        });
      });
    }
  })
  .catch((err) => {
    console.log("error", err);
    return res.json({
      error : 'Oh no! Something went wrong!'
    });
  });
});

    //bcrypt.compare(req.body.oldpassword, user.password)
    // compare old password with databased HASH pass.
    // if the passwords don't match, return error
    //req.flash("error", "Password doesn't match, did u forget it?");

//edit password
router.put('/editpass/:id', (req, res) => {
  return User.findOne({
    where : { id : req.body.id }
  })
  .then((user) => {
    if(!user){
    return console.log("error");
    }else{
      bcrypt.compare(req.body.oldpassword, user.password)
      .then(yes => {
      if (yes) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            user.update({ // hash new password and stick it into DB
              password: hash
            })
            .then(newPassword => {
              console.log('Password updated');
              return res.json({
                success : true
              });
            });
          });
        });
      }else {
        return console.log("error");
        }
      })
      .catch((err) => {
        console.log("error", err);
        return res.json({
          error : 'Oh no! Something went wrong!'
        });
      });
    }
  })
});

//edit email
router.put('/editemail/:id', (req, res) => {
  console.log(req.body, "user edit email");
  return User.findOne({
    where : { id : req.body.id }
  })
  .then(user => {
    bcrypt.compare(req.body.oldpassword, user.password)
    if (!user) { // if the passwords don't match, return error
    //req.flash("error", "Password doesn't match, did u forget it?");
    return console.log("error");
    }
    else {
      user.update({
        email: req.body.email
      })
      .then(newEmail => {
        console.log('email changed');
        return res.json({
          success : true
        });
      });
    }
  })
  .catch((err) => {
    console.log("error", err);
    return res.json({
      error : 'Oh no! Something went wrong!'
    });
  });
})

module.exports = router;