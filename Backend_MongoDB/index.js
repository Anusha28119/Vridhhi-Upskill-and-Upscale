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
const { db } = require('./models/seeker');
const bcrypt = require('bcrypt');
const session = require('express-session');


const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox7b686ee5e6174e7bad512a1edf1e5968.mailgun.org?';
const mg = mailgun({ apiKey: 'eb83491e730386ce3be54e47ebe81c11-95f6ca46-b3a00501', domain: DOMAIN });
const ejsMate = require('ejs-mate');
//const job_provider_main = require('./models/job_provider_main');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(session({secret:'Not a good secret'}));
app.engine('ejs',ejsMate);

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

app.get('/myprofile_seeker',requireLogin,(req,res) => {
    
    //const {user}=req.params;
    res.render('users/profile_seeker');
})


app.get('/profile', function(req, res, next) {

    //here it is
    var user = req.user;

    //you probably also want to pass this to your view
    res.render('users/myprofile_seeker', { title: 'profile', user: user });
});

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
            //res.send(user);
            console.log(user);
            global.User_profile=user;
            //console.log(users);
            const users = await seeker.findOne({email});
            res.render('users/profile_seeker', {users:users});
                //var userr = req.user;
                //userr._id = encrypt(userr._id);
                //res.render('users/myprofile_seeker', {
                  //  user: userr
                //});
            
            
            //res.redirect('/myprofile_seeker');
            //var user = req.user;

    //you probably also want to pass this to your view
          //res.render('users/myprofile_seeker', { title: 'profile', user: user });
          }
         else{
           res.status(401).send('Incorrect username or password. Please try again!');  
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
            const users = await investor.findOne({email});
            res.render('users/profile_investor', {users:users});
            //res.redirect('/secret')
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
            const users = await job_provider_main.findOne({email});
            var x = users.org_name;
            console.log(x);
            const userrr = await job_provider_profiles.find({org_name:x});
            res.render('users/profile_job_providers', {users:users,userrr:userrr});
            //res.redirect('/secret')
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
            const users = await entrepreneur.findOne({email});
            res.render('users/profile_entrepreneur', {users:users});

           // res.redirect('/secret')
        }
       else{
         res.redirect('/login')
        }
         }
    }

})

// //app.get('/myprofile_seeker',requireLogin,async(req,res) => {

//     res.render('users/profile_seeker')
// })

app.get('/seekers/resume',requireLogin,async(req,res) => {
    res.render('users/resume_building')
})

app.get('/seekers/skills', requireLogin, async (req, res) => {
    res.render('users/skills')
})

app.get('/seekers/scholarships', requireLogin,async (req, res) => {
    res.render('users/scholarships')
})

app.get('/seekers/interview_prep', requireLogin,async (req, res) => {
    res.render('users/interview_prep')
})

app.get('/about_us', async (req, res) => {
    res.render('users/about')
})

app.get('/contact_us', async (req, res) => {
    res.render('users/contact')
})

app.get('/seekers/quiz', requireLogin, async (req, res) => {
    res.render('users/quiz_main')
})

app.get('/seekers/quizCPP', requireLogin, async (req, res) => {
    res.render('users/quiz_cpp')
})

app.get('/seekers/quizHTML', requireLogin, async (req, res) => {
    res.render('users/quiz_HTML')
})

app.get('/seekers/quizPy', requireLogin, async (req, res) => {
    res.render('users/quiz_Py')
})

app.get('/seekers', requireLogin, async(req,res) => {
    const {tenth} = req.query
    if(tenth){
        const users = await seeker.find({tenth})
        res.render('users/view_seeker', {users, tenth})
    }
    else {
        const users = await seeker.find({})
        res.render('users/view_seeker',{users, tenth: 'All'})

    }
})

app.get('/seekers1', requireLogin, async (req, res) => {
    const { twelfth } = req.query
    if (twelfth) {
        const users = await seeker.find({ twelfth })
        res.render('users/view_seeker', { users, twelfth: 'true' })
    }
    else {
        const users = await seeker.find({})
        res.render('users/view_seeker', { users, twelfth: 'All' })

    }
})

app.get('/seekers2', requireLogin, async (req, res) => {
    const { graduation } = req.query
    if (graduation) {
        const users = await seeker.find({ graduation })
        res.render('users/view_seeker', { users, graduation })
    }
    else {
        const users = await seeker.find({})
        res.render('users/view_seeker', { users, graduation: 'All' })

    }
})

app.get('/seekers3', requireLogin, async (req, res) => {
    const { post_graduation } = req.query
    if (post_graduation) {
        const users = await seeker.find({ post_graduation })
        res.render('users/view_seeker', { users, post_graduation })
    }
    else {
        const users = await seeker.find({})
        res.render('users/view_seeker', { users, post_graduation: 'All' })

    }
})

app.get('/seekers4', requireLogin, async (req, res) => {
    const { gold_badge } = req.query
    if (gold_badge) {
        const users = await seeker.find({ gold_badge })
        res.render('users/view_seeker', { users, gold_badge })
    }
    else {
        const users = await seeker.find({})
        res.render('users/view_seeker', { users, gold_badge: 'All' })

    }
})

app.get('/seekers5', requireLogin, async (req, res) => {
    const { silver_badge } = req.query
    if (silver_badge) {
        const users = await seeker.find({ silver_badge })
        res.render('users/view_seeker', { users, silver_badge })
    }
    else {
        const users = await seeker.find({})
        res.render('users/view_seeker', { users, silver_badge: 'All' })

    }
})

app.get('/seekers6', requireLogin, async (req, res) => {
    const { bronze_badge } = req.query
    if (bronze_badge) {
        const users = await seeker.find({ bronze_badge })
        res.render('users/view_seeker', { users, bronze_badge })
    }
    else {
        const users = await seeker.find({})
        res.render('users/view_seeker', { users, bronze_badge: 'All' })

    }
})

app.get('/investors1', requireLogin,async (req, res) => {
    const { profit_sharing } = req.query
    if (profit_sharing) {
        const users = await investor.find({ profit_sharing })
        res.render('users/view_investor', { users, profit_sharing })
    }
    else {
        const users = await investor.find({})
        res.render('users/view_investor', { users, profit_sharing: 'All' })

    }
})

app.get('/investors2', requireLogin, async (req, res) => {
    const { preferred_field_first } = req.query
    if (preferred_field_first) {
        const users = await investor.find({ preferred_field_first })
        res.render('users/view_investor', { users, preferred_field_first })
    }
    else {
        const users = await investor.find({})
        res.render('users/view_investor', { users, preferred_field_first: 'All' })

    }
})

app.get('/investors3', requireLogin, async (req, res) => {
    const { preferred_field_second } = req.query
    if (preferred_field_second) {
        const users = await investor.find({ preferred_field_second })
        res.render('users/view_investor', { users, preferred_field_second })
    }
    else {
        const users = await investor.find({})
        res.render('users/view_investor', { users, preferred_field_second: 'All' })

    }
})

app.get('/investors4', requireLogin, async (req, res) => {
    const { preferred_qualification } = req.query
    if (preferred_qualification) {
        const users = await investor.find({ preferred_qualification })
        res.render('users/view_investor', { users, preferred_qualification })
    }
    else {
        const users = await investor.find({})
        res.render('users/view_investor', { users, preferred_qualification: 'All' })

    }
})

app.get('/providers1', requireLogin, async (req, res) => {
    const { org_name } = req.query
    if (org_name) {
        const users = await job_provider_profiles.find({ org_name })
        res.render('users/view_provider', { users, org_name })
    }
    else {
        const users = await job_provider_profiles.find({})
        res.render('users/view_provider', { users, org_name: 'All' })

    }
})

app.get('/providers2', requireLogin, async (req, res) => {
    const { job_profile } = req.query
    if (job_profile) {
        const users = await job_provider_profiles.find({ job_profile })
        res.render('users/view_provider', { users, job_profile })
    }
    else {
        const users = await job_provider_profiles.find({})
        res.render('users/view_provider', { users, job_profile: 'All' })

    }
})

app.get('/providers3', requireLogin, async (req, res) => {
    const { profile_location } = req.query
    if (profile_location) {
        const users = await job_provider_profiles.find({ profile_location })
        res.render('users/view_provider', { users, profile_location })
    }
    else {
        const users = await job_provider_profiles.find({})
        res.render('users/view_provider', { users, profile_location: 'All' })

    }
})

app.get('/providers4', requireLogin, async (req, res) => {
    const { req_tenth } = req.query
    if (req_tenth) {
        const users = await job_provider_profiles.find({ req_tenth })
        res.render('users/view_provider', { users, req_tenth })
    }
    else {
        const users = await job_provider_profiles.find({})
        res.render('users/view_provider', { users, req_tenth: 'All' })

    }
})

app.get('/providers5', requireLogin, async (req, res) => {
    const { req_twelfth } = req.query
    if (req_twelfth) {
        const users = await job_provider_profiles.find({ req_twelfth })
        res.render('users/view_provider', { users, req_twelfth })
    }
    else {
        const users = await job_provider_profiles.find({})
        res.render('users/view_provider', { users, req_twelfth: 'All' })

    }
})

app.get('/providers6', requireLogin, async (req, res) => {
    const { req_graduation_degree } = req.query
    if (req_graduation_degree) {
        const users = await job_provider_profiles.find({ req_graduation_degree })
        res.render('users/view_provider', { users, req_graduation_degree })
    }
    else {
        const users = await job_provider_profiles.find({})
        res.render('users/view_provider', { users, req_graduation_degree: 'All' })

    }
})

app.get('/providers7', requireLogin, async (req, res) => {
    const { req_post_graduation_degree } = req.query
    if (req_post_graduation_degree) {
        const users = await job_provider_profiles.find({ req_post_graduation_degree })
        res.render('users/view_provider', { users, req_post_graduation_degree })
    }
    else {
        const users = await job_provider_profiles.find({})
        res.render('users/view_provider', { users, req_post_graduation_degree: 'All' })

    }
})

app.get('/entrepreneurs1', requireLogin, async (req, res) => {
    const { category } = req.query
    if (category) {
        const users = await entrepreneur.find({ category })
        res.render('users/index', { users, category })
    }
    else {
        const users = await entrepreneur.find({})
        res.render('users/index', { users, category: 'All' })

    }
})

app.get('/entrepreneurs2', requireLogin, async (req, res) => {
    const { working_location } = req.query
    if (working_location) {
        const users = await entrepreneur.find({ working_location })
        res.render('users/index', { users, working_location })
    }
    else {
        const users = await entrepreneur.find({})
        res.render('users/index', { users, working_location: 'All' })

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
        graduation: req.body.graduation,
        graduation_degree: req.body.graduation_degree,
        graduation_org: req.body.graduation_org,
        post_graduation: req.body.post_graduation,
        post_graduation_degree: req.body.post_graduation_degree,
        post_graduation_org: req.body.post_graduation_org,
        gold_badge: req.body.gold_badge,
        silver_badge: req.body.silver_badge,
        bronze_badge: req.body.silver_badge
    })
    await newSeeker.save()
    req.session.user_id=newSeeker._id;
    console.log(newSeeker)
    res.render('users/profile_seeker',{users:newSeeker})

    
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
    res.render('users/profile_entrepreneur',{users:newEntrepreneur})
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
    res.render('users/profile_investor',{users:newInvestor})
})

app.get('/register/seeker', (req,res) => {
    console.log(req.body.selectpicker)
    res.render('users/new_seeker')
    const data = {
        from: 'noreply@Vriddhi.com',
        to: req.body.email,
        subject: 'Email Account Verification',
        text: 'Email account verification initiated'
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
})

app.get('/home',(req,res) => {
    res.render('users/home')
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
    var x=req.body.org_name;
    console.log(x);
    const userjob_provider_main = await job_provider_main.findOne({org_name:x});
    const userrr = await job_provider_profiles.find({org_name:x});
    res.render('users/profile_job_providers',{users:userjob_provider_main,userrr:userrr})
    
    
})

app.get('/register/job_provider_profiles', (req,res) => {
    res.render('users/new_provider_profiles')
})

app.get('/newUser', requireLogin,async (req,res) => {


    const users = await newUser.find({})
    res.render('users/index', {users})
    
})

app.get('/view/seekers', requireLogin,async (req, res) => {


    const dbo = seeker.find({})
    const users = await dbo
    console.log(users)
    res.render('users/view_seeker', { users })

})

app.get('/view/investors', requireLogin, async (req, res) => {


    const dbo = investor.find({})
    const users = await dbo
    console.log(users)
    res.render('users/view_investor', { users })

})

app.get('/view/job-providers', requireLogin, async (req, res) => {


    const dbo = job_provider_profiles.find({})
    const users = await dbo
    console.log(users)
    res.render('users/view_provider', { users })

})

app.get('/view/entrepreneurs', requireLogin, async (req, res) => {


    const dbo = entrepreneur.find({})
    const users = await dbo
    console.log(users)
    res.render('users/index', { users })
})

app.get('/secret',requireLogin,(req,res) => {
    
    //const {user}=req.params;
    res.render('users/secret',user);
})

app.listen(3000, ()=> {
    console.log("Application is runing on port 3000!")
})