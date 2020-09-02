const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0.3utaa.mongodb.net/portfolio-web?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

let acc, profile, charge, skill, social, timeline;

client.connect(err => {
  acc = client.db("portfolio-web").collection("account");
  profile = client.db("portfolio-web").collection("profile");
  charge = client.db("portfolio-web").collection("charge");
  skill = client.db("portfolio-web").collection("skill");
  social = client.db("portfolio-web").collection("social");
  timeline = client.db("portfolio-web").collection("timeline");
  // perform actions on the collection object
  //client.close();
});

//let acc, db;

// MongoClient.connect('mongodb://localhost:27017/portfolio-web', (error, database) => {
//     if(error){
//         console.log(`MongoDB connect Error : ${error}`);
//     }
//     else{
//         db = database.db('portfolio-web');

//         acc = db.collection('account');
//         profile = db.collection('profile');
//         charge = db.collection('charge');
//         skill = db.collection('skill');
//         social = db.collection('social');
//         timeline = db.collection('timeline');

//         computer = db.collection('computer');
//         sns = db.collection('sns');

//         console.log(`MongoDB connect Succeces pofolModule.`);
//     }
// })

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
}
