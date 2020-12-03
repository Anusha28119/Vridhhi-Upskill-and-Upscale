const mongoose = require('mongoose');

const providerMainSchema = new mongoose.Schema(
    {
        org_name: {
            type: String,
            required: true
        },
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
        vacancies: {
            type: Number,
            required: true
        },
        job_profiles: {
            type: String,
            required: false
        },
        total_compensation: {
            type: Boolean,
            required: true
        }
    }
)

const providerMain = mongoose.model('seeker',providerMainSchema);
module.exports = providerMain;