const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');

const app = express();

const loginRouter = require('./router/login');
const port = 3000;

app.set('views','./router/views');
app.set('view engine', 'pug');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: "mongodb://localhost:27017/portfolio-web",
        collection: "sessions"
    })
}))

app.use('/login', loginRouter)

app.get('/',(req,res) => {
    if(req.session.user == true){
        res.render('home');
    }else{
        res.redirect('/login');
    }
})

app.listen(port,(req, res)=>{
    console.log(`Server port : ${port}`);
})