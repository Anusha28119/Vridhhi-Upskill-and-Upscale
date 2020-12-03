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
const job_provider_main = require('./models/job_provider_main');
const job_provider_profiles = require('./models/job_provider_profiles');
//const job_provider_main = require('./models/job_provider_main');

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

app.post('/job_providers', async (req,res) => {
    const newjob_provider_main = new job_provider_main({
        org_name: req.body.org_name,
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        password: req.body.password,
        vacancies: req.body.vacancies,
        job_profiles: req.body.job_profiles,
        total_compensation: req.body.total_compensation
    })
    await newjob_provider_main.save()
    console.log(newjob_provider_main)
    res.redirect('/register/job_provider_profiles')
    
})

app.get('/register/job_provider', (req,res) => {
    res.render('users/new_provider_main')
})

app.post('/job_provider_profiles', async (req,res) => {
    const newjob_provider_profiles = new job_provider_profiles({
        org_name: req.body.org_name,
        job_profile: req.body.job_profile,
        vacancies: req.body.vacancies,
        profile_compensation: req.body.profile_compensation,
        profile_location: req.body.profile_location,
        brief_overview_of_profile: req.body.brief_overview_of_profile,
        req_tenth: req.body.req_tenth,
        req_twelfth: req.body.req_twelfth,
        req_graduation_degree: req.body.req_graduation_degree,
        req_post_graduation_degree: req.body.req_post_graduation_degree,
        gold_required: req.body.gold_required,
        silver_required: req.body.silver_required,
        bronze_required: req.body.bronze_required

    })
    await newjob_provider_profiles.save()
    console.log(newjob_provider_profiles)
    res.redirect('/newUser')
    
})

app.get('/register/job_provider_profiles', (req,res) => {
    res.render('users/new_provider_profiles')
})

app.get('/newUser', async (req,res) => {

    
    const users = await newUser.find({})
    res.render('users/index', {users})
    
})

app.listen(3000, ()=> {
    console.log("Application is runing on port 3000!")
})