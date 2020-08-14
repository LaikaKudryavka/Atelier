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
    if(checkValidator(user, pass, email))
    {
        acc.insertOne({user:user, pass:pass, email:email},{ useUnifiedTopology: true }, (e) => {
            if(e){
                console.log(e);
            }
        });

        console.log('회원가입 성공');
    }else{
        console.log('회원가입 실패');
    }
    callback();
}

let checkValidator = (user, pass, email) => {
    if(!user){
        console.log('empty user');
        return false;
    }    
    if(checkDupleUser(user) == true){
        console.log('tlqkffusdk');
        return false;
    }

    if(!pass){
        console.log('empty password');
        return false;
    }
    if(!email){
        console.log('empty email');
        return false;
    }
    acc.findOne({email:email},(e, o) => {
        if(o){
            console.log('someone using E-Mail');
            return false;
        }
    });

    console.log('pass validator');

    return true;
}

function checkDupleUser(user){
    return acc.findOne({user:user},(e,o) => {
        if(o){
            console.log("someone using userid");
            return true;
        }
    });
}