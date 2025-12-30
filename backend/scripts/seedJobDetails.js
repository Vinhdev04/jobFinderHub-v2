// Simple seeder to create JobDetail entries for existing JobPosting documents that don't have details
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/database');
const JobPosting = require('../models/JobPosting');
const JobDetail = require('../models/JobDetail');

const seed = async () => {
    try {
        await connectDB();
        const jobs = await JobPosting.find({});
        console.log(`Found ${jobs.length} jobs`);

        let created = 0;
        for (const job of jobs) {
            const existing = await JobDetail.findOne({ job: job._id });
            if (existing) continue;

            const payload = {
                job: job._id,
                moTaChiTiet: job.moTaCongViec || job.moTaCongViec || '',
                nhiemVu: [],
                yeuCauChiTiet: job.yeuCau || '',
                kyNang: job.kyNangYeuCau || [],
                loiIch: job.quyenLoi || '',
                huongDanUngTuyen: 'Ứng tuyển trực tuyến qua hệ thống',
                attachments: []
            };

            await JobDetail.create(payload);
            created++;
        }

        console.log(`Created ${created} JobDetail documents`);
        process.exit(0);
    } catch (err) {
        console.error('Seeder error:', err);
        process.exit(1);
    }
};

seed();
