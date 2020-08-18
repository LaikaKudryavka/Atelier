const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

let acc, db;

MongoClient.connect('mongodb://localhost:27017/portfolio-web', (error, database) => {
    if(error){
        console.log(`MongoDB connect Error : ${error}`);
    }
    else{
        db = database.db('portfolio-web');
        acc = db.collection('account');

        console.log(`MongoDB connect Succeces.`);
    }
})

exports.localLogin = (user, pass, callback) => {
    acc.findOne({user:user}, function(e, o){
        if(o){
            o.pass == pass ? callback(o) : callback(null);
        }else{            
            callback(null);
        }
    });
}

exports.signUp = (user, pass, email, callback) => {
    
    acc.findOne({user:user},(e,o) => {
        if(o){
            console.log("someone using userid");
            return false;
        }
        acc.findOne({email:email},function(e, o) {
            if(o){
                console.log('someone using E-Mail');
            } else{
                acc.insertOne({user:user, pass:pass, email:email},{ useUnifiedTopology: true }, (e) => {
                    if(e){
                        console.log(e);
                    }
                });
            }
        });
    });

    callback();
}

let checkValidator = (user, pass, email) => {
    
    console.log('pass validator');

    
};

function checkDupleUser(user){
    
}