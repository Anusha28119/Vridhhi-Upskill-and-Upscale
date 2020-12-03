const mongoose = require('mongoose');

const entrepreneurSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        venture_name: {
            type:String,
            required:true
        },
        team_leader: {
            type:String,
            required:true
        },
        brief_idea_overview:{
            type:String,
            required:true
        },
        funding_required: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true,
            lowercase: true,
            enum:['science and technology','arts','social entrepreneurship','women empowerment','education','health sector','safety']
        },
        start_date_of_venture: {
            type: Date,
            required: true
        },
        current_number_of_employees: {
            type: Number,
            required: true
        },
        working_location:{
            type:String,
            required:true
        },
        idea_phase:{
            type:Boolean,
            required:true
        },
        current_annual_turnover:{
            type:Number,
            required:true
        },
        job_provider:{
            type:Boolean,
            required:true
        }


    }
)

const entrepreneur = mongoose.model('entrepreneur',entrepreneurSchema);
module.exports = entrepreneur;