const config = require('../config/config.js');
const MongoClient = require('mongodb').MongoClient;
const MONGO_URI = config.votingApp.localhost.db;


const mongoDriver = {
	connect: cb => {
		MongoClient.connect(MONGO_URI, (err, db) => {
			if(err){
				console.error("Error with database connection!");
				cb({error: true});
			}
			else{
				console.log("Successfully started mongoDriver!");
				cb(db);
			}
		});
	}
}
 
		

module.exports = mongoDriver;