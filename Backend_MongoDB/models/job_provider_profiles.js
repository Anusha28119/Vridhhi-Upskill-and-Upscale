const mongoose = require('mongoose');

const providerProfilesSchema = new mongoose.Schema(
    {
        org_name: {
            type: String,
            required: true
        },
        job_profile: {
            type: String,
            required: true
        },
        vacancies: {
            type: Number,
            required: true,
        },
        profile_compensation: {
            type: Number,
            required: true
        },
        profile_location: {
            type: String,
            required: true
        },
        brief_overview_of_profile: {
            type: String,
            required: true
        },
        req_tenth: {
            type: Boolean,
            required: true
        },
        req_twelfth: {
            type: Boolean,
            required: true
        },
        req_graduation_degree: {
            type: String,
            required: false
        },
        req_post_graduation_degree: {
            type: String,
            required: false
        },
        badge_required: {
            type: String,
            required: false
        }

    }
)

const providerProfiles = mongoose.model('providerProfiles',providerProfilesSchema);
module.exports = providerProfiles;