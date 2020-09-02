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
        profile = db.collection('profile');
        charge = db.collection('charge');
        skill = db.collection('skill');
        social = db.collection('social');
        timeline = db.collection('timeline');

        computer = db.collection('computer');
        sns = db.collection('sns');

        console.log(`MongoDB connect Succeces pofolModule.`);
    }
})

exports.update = (user, char1) => {
    charge.find({writer_user:user}, (e, o) => {
        if(o){
            charge.insert({writer_user:user, content:char1}, { useUnifiedTopology: true }, (e) => {
                if(e){
                    console.log(e);
                }else{
                    console.log("insert!");
                }
            });
        }else{
            console.log(`${o}`);
        }
    })
}

exports.p1 = (user, callback) => {
    charge.find({writer_user:user}).toArray((e,res) => {
        if(e) callback;
        else callback(null, res);
    })
    
    profile.find({writer_user:user}).toArray((e,res) => {
        if(e) callback;
        else callback(null, res);
    })
}
