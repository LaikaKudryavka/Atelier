const router = require("express").Router();
const authModule = require('./module/pofolModule');


router.use(function(req, res, next){
    if(req.session.user){
        next();
    }else{
        res.redirect('../');
    }
});

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
    res.render('./portfolioweb/index');
})

router.get('/p1',(req, res) => {
    authModule.p1(req.session.user, (e, charge) =>{
        res.render('./portfolioweb/p1', {char:charge});
    })
})

router.get('/timeline',(req, res) => {
    res.render('./portfolioweb/timeline');
})

router.post('/update',(req, res) => {
    authModule.update(req.session.user, req.body.charge1, req.body.charge2, req.body.charge3, req.body.charge4,);
})

module.exports = router;