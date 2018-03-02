const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const polls = require('../modules/polls.js');


router.get('/', (req, res, next) => {
  	res.render('index.ejs', {view: '../public/views/home.html'})
});


router.get('/mypolls', (req, res, next) => {
  	req.user ? res.render('index.ejs', {view: '../public/views/mypolls.html'}) : res.redirect('/')
});


router.get('/newpoll', (req, res, next) => {
  	req.user ? res.render('index.ejs', {view: '../public/views/newpoll.html'}) : res.redirect('/')
});

router.get('/poll', (req, res) => {
	res.render('index.ejs', {view: '../public/views/poll.html'})
});


router.get('/user', (req, res) => {
	res.send({user: req.user});
});


router.get('/login/twitter', passport.authenticate('twitter'), (req, res) => {
	res.send("Redirecting...");
});


router.get('/login/twitter/return', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});


router.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.send('Logged out!');
  });
});


module.exports = router;
