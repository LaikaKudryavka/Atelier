const router = require("express").Router();

const authModule = require('./module/authModule');

router.use(function(req, res, next){
    next();
});

router.get("/",(req, res) => {
    res.render('./loginpage');
})

router.get('/a',(req,res) => {
    res.send("a");
})

router.post('/login',(req, res) => {
    authModule.localLogin(req.body['user'], req.body['password'], (o) => {
        if(!o){
            console.log("로그인 실패");
        }
        req.session.user = o;
        console.log(`${req.session.user} / ${o}`);
        console.log(`userid : ${req.body['user']} userpass : ${req.body['password']}`);
        console.log("login finish");
        res.redirect('../');
    });
})

router.post('/logout',(req,res) => {
    req.session.destroy(function(e){ 
        req.session;
    });
    console.log("logout!");
    res.redirect('../');
})

router.post('/signup',(req,res) => {
    authModule.signUp(req.body['user'],req.body['password'],req.body['email'],() => {
        res.redirect('../');
    })
})

module.exports = router;