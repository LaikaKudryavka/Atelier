const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

var acc, db;

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

exports.checkLogin = (user, pass, callback) => {
    acc.findOne({user:user}, function(e, o){
        if(o){
            console.log(o);
            console.log(user);
            o.pass == pass ? callback(o) : callback(null);
        }else{
            callback(null);
        }
    });
}