const mongoose = require('mongoose');

const jobDetailSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobPosting',
            required: true,
            unique: true
        },

        // Full detailed description (can contain HTML)
        moTaChiTiet: {
            type: String,
            default: ''
        },

        // Responsibilities / duty list
        nhiemVu: [
            {
                type: String
            }
        ],

        // More detailed requirements
        yeuCauChiTiet: {
            type: String,
            default: ''
        },

        // Additional skills as array
        kyNang: [
            {
                type: String
            }
        ],

        // Benefits or perks
        loiIch: {
            type: String,
            default: ''
        },

        // Application instructions
        huongDanUngTuyen: {
            type: String,
            default: ''
        },

        // Attachments (e.g., PDF job spec) stored as URLs
        attachments: [
            {
                url: String,
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('JobDetail', jobDetailSchema);
