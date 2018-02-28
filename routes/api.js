const express = require('express');
const router = express.Router();
const path = require('path');
const polls = require('../modules/polls.js');
const mongoDriver = require('../modules/mongoDriver.js');

mongoDriver.connect( response => {

	if(!response.error){
		var db = response; //mongo driver

		router.get('/poll', (req, res) => {
			polls.findPoll(db, req.query.id, response => {
				res.send(response);
			});
		});

		router.post('/poll', (req, res) => {
			polls.newPoll(db, req, response => {
				res.send(response);
			});
		});

		router.delete('/poll', (req, res) => {
			polls.deletePoll(db, req.query.poll_id, response => {
				res.send(response);
			})
		})

		router.get('/poll/mypolls', (req, res) => {
			polls.getMyPolls(db, req.query.user_id, response => {
				res.send(response);
			});
		});

		router.get('/poll/all', (req, res) => {
			polls.getAllPolls(db, response => {
				res.send(response);
			});
		});

		router.post('/option', (req, res) => {
			polls.newOption(db, req.body.poll_id, req.body.newOption, response => {
				res.send(response);
			});
		});

		router.put('/option', (req, res) => {
			polls.newVote(db, req.body.poll_id, req.body.option_description, req.connection.remoteAddress, req.user, response =>{
				res.send(response);
			});
		});
	}

});


module.exports = router;
