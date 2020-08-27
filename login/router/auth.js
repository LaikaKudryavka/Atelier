const router = require("express").Router();
const authModule = require('./module/authModule');

const { body, validationResult } = require('express-validator');


router.use(function(req, res, next){
    if(!req.session.user){
        next();
    }else{
        res.redirect('../');
    }
});

router.get("/",(req, res) => {
    res.render('./loginpage');
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

router.post('/signup',[
    body('user').isLength({min:4}).withMessage("아이디는 4자 이상 작성하시기 바랍니다."), 
    body('password').isLength({min:5}).withMessage("비밀번호는 5자 이상 작성하기 바랍니다."),
    body('email').isEmail().withMessage("이메일 형태가 아닙니다.")
],(req,res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    authModule.signUp(req.body.user,req.body.password,req.body.email,req.body.teleNum,() => {
        res.redirect('../');
    })
})

module.exports = router;