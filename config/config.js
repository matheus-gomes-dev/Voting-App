"use strict";
const config = {
	votingApp:{
		localhost: {
			db: "mongodb://localhost:27017/votingApp",
			username: "",
			pass: ""
		},
		atlas: {
			db: 'mongodb://Matheus:kirkhetfield_92@cluster0-shard-00-00-qrgyy.mongodb.net:27017,cluster0-shard-00-01-qrgyy.mongodb.net:27017,cluster0-shard-00-02-qrgyy.mongodb.net:27017/alumni?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
			username: "",
			pass: ""
		}
	},
	passport:{
		consumerKey: "nloM1Tbc8iBHQYvFK8ReN0fLX",
	    consumerSecret: "ta0vygeuelkDujM87L669Es6deXodLRLD7N9JEHsCtGqQqAaeZ",
    	callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
	}
}

module.exports = config;