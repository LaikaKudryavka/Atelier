const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0.3utaa.mongodb.net/portfolio-web?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

let acc, profile, charge, skill, social, timeline;

client.connect(err => {
  db = client.db("portfolio-web");
  acc = client.db("portfolio-web").collection("account");
  profile = client.db("portfolio-web").collection("profile");
  charge = client.db("portfolio-web").collection("charge");
  skill = client.db("portfolio-web").collection("skill");
  social = client.db("portfolio-web").collection("social");
  timeline = client.db("portfolio-web").collection("timeline");
  // perform actions on the collection object
  //client.close();
});

// 해당 주석은 로컬 DB 사용시 사용하는 스크립트 입니다.
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

// e는 Error o는 Object를 의미
// 업데이트 관련 메소드

exports.updateHello = (user, hello_text) => {
    profile.findOneAndUpdate({writer_user:user},
        {$set:{hello_text:hello_text}},
        {returnOriginal : false, upsert : true});
}

exports.updateIntro = (user, intro) => {
    profile.findOneAndUpdate({ writer_user:user }, 
        {$set:{introduce:intro}}, 
        {returnOriginal : false , upsert : true}, ()=>{
        console.log("findOneAndUpdate!");
    });
}

exports.updateSkill = (user,skills,skillExp) => {
    skill.deleteMany({writer_user:user},() => {
        for(i in skills){
            skill.findOneAndUpdate({writer_user:user, index:i}, 
                {$set:{skill:skills[i], skill_exp:skillExp[i]}}, 
                {returnOriginal : false, upsert : true})
        }
    });
    
}

exports.updateTimeline = (user, date, category, content) => {
    timeline.deleteMany({writer_user:user},()=>{
        for(i in content){
            timeline.findOneAndUpdate({writer_user:user, index:i},
                {$set:{date:date[i], category:category[i], content:content[i]}},
                {returnOriginal : false, upsert : true});
        }
    });
   
}

// 페이지에 필요한 데이터 수집

exports.index = (user, callback) => {
    profile.findOne({writer_user:user},(e,o) => {
        callback(o);
    })
}

exports.p1 = (user, callback) => {
        profile.findOne({writer_user:user}, (e,o1) => {
        skill.find({writer_user:user}).toArray((e,o2) => {
            callback(o1,o2);
        });
    });
}

exports.timeline = (user, callback) => {
    timeline.find({writer_user:user}).sort({date:1}).toArray((e,o) => {
            callback(o);
    });
}

// 페이지 내부에서 돌아가는 기능요청

exports.selectCertificate = (user, callback) => {
    timeline.find({writer_user:user, category:'certificate'},(e,o) => {
        callback(o);
    })
}

exports.selectCareer = (user, callback) => {
    timeline.find({writer_user:user, category:'career'},(e,o) => {
        callback(o);
    });
}