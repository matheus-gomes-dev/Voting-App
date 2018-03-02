"use strict";
const config = {
	votingApp:{
		localhost: {
			db: "mongodb://localhost:27017/votingApp",
			username: "",
			pass: ""
		}
	},
	passport:{
		consumerKey: "nloM1Tbc8iBHQYvFK8ReN0fLX",
	    consumerSecret: "ta0vygeuelkDujM87L669Es6deXodLRLD7N9JEHsCtGqQqAaeZ",
    	callbackURL: 'https://sheltered-harbor-60080.herokuapp.com/login/twitter/return'
	}
}

module.exports = config;