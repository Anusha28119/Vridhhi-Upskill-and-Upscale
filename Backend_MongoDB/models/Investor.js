const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema(
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
        investment_budget: {
            type:Number,
            required:true
        },
        expected_return: {
            type:Number,
            required:true
        },
        profit_sharing:{
            type:Boolean,
            required:true
        },
        preferred_field_first: {
            type: String,
            required: true,
            lowercase: true,
            enum:['science and technology','arts','social entrepreneurship','women empowerment','education','health sector','safety']
        },
        preferred_field_second: {
            type: String,
            required: true,
            lowercase: true,
            enum:['science and technology','arts','social entrepreneurship','women empowerment','education','health sector','safety']
        },
        preferred_qualification: {
            type: String,
            required: false,
            lowercase: true,
            enum: ['b.tech', 'b.sc','bba', 'mbbs','md','b.com','mba','b.arch']
        }


    }
)

const investor = mongoose.model('investor',investorSchema);
module.exports = investor;