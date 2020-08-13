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
    loginModule.checkLogin(req.body['user'], req.body['password'],() => {
        req.session.user = req.user;

        console.log(`session.user : ${req.session.user}`);
        console.log(`userid : ${req.user} userpass : ${req.password}`);
        console.log("login finish");
        res.redirect('../');
    });
})

module.exports = router;