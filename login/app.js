const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


const app = express();
const loginRouter = require('./router/auth.js');
const contentRouter = require('./router/content.js');

const port = 3000;

//======================================================

app.set('views', __dirname + '/router/views');
app.set('view engine', 'pug');

app.use(bodyParser());
app.use(express.static(__dirname + '/router/views'));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: "mongodb://localhost:27017/portfolio-web",
        collection: "sessions"
    })
}))

app.use('/auth', loginRouter)
app.use('/content', contentRouter)

app.get('/',(req,res) => {
    if(req.session.user){
        res.redirect('/content');
    }else{
        res.redirect('/auth');
    }
})

app.listen(port,(req, res)=>{
    console.log(`Server port : ${port}`);
})