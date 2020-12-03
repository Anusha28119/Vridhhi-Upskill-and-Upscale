const mongoose = require('mongoose');

const seekerSchema = new mongoose.Schema(
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
        tenth: {
            type: Boolean,
            required: true
        },
        tenth_org: {
            type: String,
            required: false
        },
        twelfth: {
            type: Boolean,
            required: true
        },
        twelfth_org: {
            type: String,
            required: false
        },
        graduation_degree: {
            type: String,
            required: false
        },
        graduation_org: {
            type: String,
            required: false
        },
        post_graduation_degree: {
            type: String,
            required: false
        },
        post_graduation_org: {
            type: String,
            required: false
        },
        gold_badge: {
            type: String,
            required: true
        },
        silver_badge: {
            type: String,
            required: true
        },
        bronze_badge: {
            type: String,
            required: true
        }

    }
)

const seeker = mongoose.model('seeker',seekerSchema);
module.exports = seeker;
