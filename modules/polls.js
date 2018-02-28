const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const express = require('express');
const crypto = require('crypto');
const path = require('path');
const cfg = require('../config/config.js');
const router = express.Router();
const mongo_access = cfg.votingApp.localhost;


const polls = {
	newPoll: function(db, req, cb){
		let options = [];
		//set options array
		for(let i = 0; i<req.body.options.length; i++){
			let aux = {
				description: req.body.options[i],
				votes: 0
			}
			options.push(aux);
		}
		let newPoll = {
            title: req.body.title,
            options: options,
            author: req.user.id,
            votes: [],
            poll_id: crypto.randomBytes(20).toString('hex')
        }
        let Polls = db.collection('polls');
        Polls.insert(newPoll, function(error,docsInserted){
            if(docsInserted)
                cb("database updated!");
            else if(error){
            	console.error("Error while creating new poll!")
            	cb("Error!");
            }
        });
	},

	getAllPolls: function(db, cb){
		let Polls = db.collection('polls');
		let cursor = Polls.find();
		let pollsArray = [];
		cursor.each(function(err, item) {
        	// If the item is null then the cursor is exhausted/empty and closed
            if(item == null) {
                cb(pollsArray);
                return;
            }
            else
                pollsArray.push(item);
        });
	},

    getMyPolls: function(db, user_id, cb){
        let Polls = db.collection('polls');
        let cursor = Polls.find({author: user_id});
        let pollsArray = [];
        cursor.each(function(err, item) {
            // If the item is null then the cursor is exhausted/empty and closed
            if(item == null) {
                cb(pollsArray);
                return;
            }
            else
                pollsArray.push(item);
        });
    },

	findPoll: function(db, id, cb){
		let Polls = db.collection('polls');
		Polls.findOne({
            "poll_id": id
        }, function(error, result){
            if (error){ 
                console.log("Database error!!");
                cb({error: true})
            }
            if (result){
                cb(result)
            }
            else{
            	console.log("Poll with id " + id + " not found!");
                cb({error: true})
            }
        });
	},

    deletePoll: function(db, id, cb){
        let Polls = db.collection('polls');
        Polls.deleteOne(
            {"poll_id": id},
            (error, result) => {
                if(error){
                    console.log("Error while deleting poll " + id);
                    cb({error: true})
                }
                else{
                    console.log("Poll " + id + " deleted!");
                    cb(result)
                }
            }
        )
    },

	newOption: function(db, poll_id, new_option, cb){
		let Polls = db.collection('polls');
		this.findPoll(db, poll_id, function(response){
			if(response.error)
				return cb({error: true})
			else{
				for(let i=0; i<response.options.length; i++){
					if(response.options[i].description == new_option)
						return cb({message: "Option already exists!"});
				}
				Polls.update(
                    {_id: response._id},
                    {$push:{options:{description: new_option, votes: 0}}},
                    function(error, response){
                        if(error){
                            console.log("Error while updating document!")
                            return cb({error: true})
                        }
                        else
                            return cb(response);
                    }
                );
			}
		})
	},

    newVote: function(db, poll_id, option_description, vote_ip, vote_user, cb){
        //reference to increase specif element in document's array:
        //https://www.wiredprairie.us/blog/index.php/archives/1895
        let Polls = db.collection('polls');
        this.findPoll(db, poll_id, function(response){
            if(response.error)
                return cb({error: true})
            else{
                //check ip and user id, to check if user has already voted
                if( ((vote_user) && ~response.votes.indexOf(vote_user.id)) || ~response.votes.indexOf(vote_ip) )
                    return cb({message: "You have already voted on this poll!"})
                let newVoteIdentifier = [];
                if(vote_user)
                    newVoteIdentifier.push(vote_user.id)
                newVoteIdentifier.push(vote_ip);
                Polls.update(
                    {
                        _id: response._id,
                        'options.description' : option_description
                    },
                    {
                        $push: {votes: {$each: newVoteIdentifier}},
                        $inc: {'options.$.votes': 1}
                    },
                    function(error, response){
                        if(error){
                            console.log("Error while updating document!")
                            return cb({error: true})
                        }
                        else
                            return cb(response);
                    }
                );
            }
        });
    }
}


module.exports = polls;