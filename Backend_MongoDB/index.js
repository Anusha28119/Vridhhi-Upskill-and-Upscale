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
const bcrypt = require('bcrypt');
const session = require('express-session');
//const job_provider_main = require('./models/job_provider_main');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(session({secret:'Not a good secret'}));

const requireLogin =(req,res, next) =>{
    if(!req.session.user_id)
    {
        return res.redirect('/login')
    }
    next();

}

mongoose.connect('mongodb://localhost/Vriddhi_newUser', { useNewUrlParser: true }).then(() => {
    console.log("Mongo connection open!")
}).catch(err => {
    console.log("Mongo connection error")
    console.log(err)
});


app.get('/login', (req,res) => {
    res.render('users/login')
})

app.post('/login', async(req,res) => {
    const{email, password, User} = req.body;
    console.log(User);
    if(User == 'seeker'){
         const user = await seeker.findOne({email});
         if(user==null)
         {
            res.send("Try again")
         }else{
         const validPassword= await bcrypt.compare(password, user.password);
         if(validPassword){
            req.session.user_id=user._id;
            res.redirect('/secret')
          }
         else{
           res.redirect('/login')
          }
        }
    }else if( User == 'investor'){
         const user = await investor.findOne({email});
         if(user==null)
         {
            res.send("Try again")
         }else{
         const validPassword= await bcrypt.compare(password, user.password);
         if(validPassword){
            req.session.user_id=user._id;
            res.redirect('/secret')
        }
       else{
         res.redirect('/login')
        }
        }
    }else if(User == 'job_provider'){
         const user = await job_provider_main.findOne({email});
         if(user==null)
         {
            res.send("Try again")
         }else{
         const validPassword= await bcrypt.compare(password, user.password);
         if(validPassword){
            req.session.user_id=user._id;
            res.redirect('/secret')
        }
       else{
         res.redirect('/login')
        }
         }
    }else{
         const user = await entrepreneur.findOne({email});
         if(user==null)
         {
            res.send("Try again")
         }else{
         const validPassword= await bcrypt.compare(password, user.password);
         if(validPassword){
            req.session.user_id=user._id;
            res.redirect('/secret')
        }
       else{
         res.redirect('/login')
        }
         }
    }

})

app.post('/logout', (req,res) => {
    req.session.user_id=null;
    res.redirect('/login');
})


app.post('/seekers', async (req,res) => {
    
    const hash_pwd = await bcrypt.hash(req.body.password,12);
    const newSeeker = new seeker({
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        password: hash_pwd,
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
    req.session.user_id=newSeeker._id;
    console.log(newSeeker)
    res.redirect('/newUser')

    
})

app.post('/entrepreneurs', async (req, res) => {
    const hash_pwd = await bcrypt.hash(req.body.password,12);
    const newEntrepreneur = new entrepreneur({
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        password: hash_pwd,
        venture_name: req.body.venture_name,
        team_leader: req.body.team_leader,
        brief_idea_overview: req.body.brief_idea_overview,
        funding_required: req.body.funding_required,
        category: req.body.category,
        start_date_of_venture: req.body.start_date_of_venture,
        current_number_of_employees: req.body.current_number_of_employees,
        working_location: req.body.working_location,
        idea_phase: req.body.idea_phase,
        current_annual_turnover: req.body.current_annual_turnover,
        job_provider: req.body.job_provider
    })
    await newEntrepreneur.save()
    req.session.user_id=newEntrepreneur._id;
    console.log(newEntrepreneur)
    res.redirect('/newUser')
})

app.post('/investors', async (req, res) => {
    const hash_pwd = await bcrypt.hash(req.body.password,12);
    const newInvestor = new investor({
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        password: hash_pwd,
        investment_budget: req.body.investment_budget,
        expected_return: req.body.expected_return,
        profit_sharing: req.body.profit_sharing,
        preferred_field_first: req.body.preferred_field_first,
        preferred_field_second: req.body.preferred_field_second,
        preferred_qualification: req.body.preferred_qualification
    })
    await newInvestor.save()
    req.session.user_id=newInvestor._id;
    console.log(newInvestor)
    res.redirect('/newUser')
})

app.get('/register/seeker', (req,res) => {
    res.render('users/new_seeker')
})


app.get('/register/entrepreneur', (req, res) => {
    res.render('users/new_entrepreneur')
})

app.get('/register/investor', (req, res) => {
    res.render('users/new_investor')
})

app.post('/job_providers', async (req,res) => {
    const hash_pwd = await bcrypt.hash(req.body.password,12);
    const newjob_provider_main = new job_provider_main({
        org_name: req.body.org_name,
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        password: hash_pwd,
        vacancies: req.body.vacancies,
        job_profiles: req.body.job_profiles,
        total_compensation: req.body.total_compensation
    })
    await newjob_provider_main.save()
    req.session.user_id=newjob_provider_main._id;
    console.log(newjob_provider_main)
    res.redirect('/register/job_provider_profiles')
    
})

app.get('/register/job_provider', (req,res) => {
    res.render('users/new_provider_main')
})


app.get('/register/job_provider_profiles', (req,res) => {
    res.render('users/new_provider_profiles')
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
    req.session.user_id=newjob_provider_profiles._id;
    console.log(newjob_provider_profiles)
    res.redirect('/newUser')
    
})

app.get('/register/job_provider_profiles', (req,res) => {
    res.render('users/new_provider_profiles')
})

app.get('/newUser', requireLogin,async (req,res) => {


    const users = await newUser.find({})
    res.render('users/index', {users})
    
})

app.get('/secret',requireLogin,(req,res) => {
    
    res.render('users/secret');
})

app.listen(3000, ()=> {
    console.log("Application is runing on port 3000!")
})