const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seeker = require('./models/seeker');
const entrepreneur = require('./models/entrepreneur');
const investor = require('./models/Investor');
const { urlencoded } = require('express');
const { request } = require('http');
const newUser = require('./models/newuser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/Vriddhi_newUser', { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});

app.post('/seekers', async (req,res) => {
    const newSeeker = new seeker({
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        password: req.body.password,
        tenth: req.body.tenth,
        tenth_org: req.body.tenth_org,
        twelfth: req.body.twelfth,
        twelfth_org: req.body.twelfth_org,
        graduation_degree: req.body.graduation_degree,
        graduation_org: req.body.graduation_org,
        post_graduation_degree: req.body.post_graduation_degree,
        post_graduation_org: req.body.post_graduation_org,
        gold_badge: req.body.gold_badge,
        silver_badge: req.body.silver_badge,
        bronze_badge: req.body.silver_badge
    })
    await newSeeker.save()
    console.log(newSeeker)
    res.redirect('/newUser')
    
})

app.get('/register/seeker', (req,res) => {
    res.render('users/new_seeker')
})

app.get('/newUser', async (req,res) => {

    
    const users = await newUser.find({})
    res.render('users/index', {users})
    
})

app.listen(3000, ()=> {
    console.log("Application is runing on port 3000!")
})