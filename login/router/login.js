const router = require("express").Router();

const loginModule = require('./module/loginModule');

router.use(function(req, res, next){
    next();
});

router.get("/",(req, res) => {
    res.render('./loginpage');
})

router.get('/a',(req,res) => {
    res.send("a");
})

router.post('/',(req, res) => {
    loginModule.checkLogin(req.body['user'], req.body['password'], (o) => {

        req.session.user = o;
        console.log(`${req.session.user} / ${o}`);
        console.log(`userid : ${req.body['user']} userpass : ${req.body['password']}`);
        console.log("login finish");
        res.redirect('../');
    });
})

module.exports = router;