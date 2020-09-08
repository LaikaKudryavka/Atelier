const router = require("express").Router();
const pofolModule = require('./module/pofolModule');


router.use(function(req, res, next){
    if(req.session.user){
        next();
    }else{
        res.redirect('../');
    }
});

//======== 페이지 링크 ===========

router.get("/",(req, res) => {
    res.redirect('/content/index');
})

router.get('/admin',(req, res) => {
    res.render('./portfolioweb/admin');
})

router.get('/ha',(req, res) => {
    res.render('./portfolioweb/ha');
})

router.get('/index',(req, res) => {
    pofolModule.index(req.session.user, (profile) => {
        res.render('./portfolioweb/index',{profile:profile});
    })
})

router.get('/p1',(req, res) => {
    pofolModule.p1(req.session.user, (profiles, skills) => {
        res.render('./portfolioweb/p1', {profiles:profiles, skills:skills});
    })
})

router.get('/timeline',(req, res) => {
    pofolModule.timeline(req.session.user, (timeline) => {
        res.render('./portfolioweb/timeline',{timelinecontent:timeline});
    });
})

//=========================업데이트==================================

router.post('/updateHello',(req, res) => {
    pofolModule.updateHello(req.session.user, req.body.hello_text);
    res.redirect('/');
})

router.post('/updateIntro',(req, res) => {
    pofolModule.updateIntro(req.session.user, req.body.introduce);
    console.log('introUpdate');
    res.redirect('/');
})

router.post('/updateSkill',(req, res) => {
    pofolModule.updateSkill(req.session.user, req.body.skill, req.body.skill_exp);
    res.redirect('/');
})

router.post('/updateTimeline', (req, res) => {
    pofolModule.updateTimeline(req.session.user, req.body.date, req.body.category, req.body.content);
    res.redirect('/');
})

// =========== 페이지 내부 기능 ===============

router.get('/selectCert', (req, res) => {
    pofolModule.selectCertificate(req.session.user,(timeline)=>{
        res.render('../timeline',{timelinecontent:timeline});
    });
})

router.get('/logout',(req, res) => {
    req.session.destroy(function(){
        req.session;
    });
    res.redirect('/');
})

module.exports = router;