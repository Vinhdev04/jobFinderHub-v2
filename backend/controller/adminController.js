const Setting = require('../models/Setting');
const User = require('../models/User');
const Company = require('../models/Company');
const JobPosting = require('../models/JobPosting');
const Application = require('../models/Application');
const Interview = require('../models/Interview');
const Notification = require('../models/Notification');
const Report = require('../models/Report');
const Activity = require('../models/Activity');
const path = require('path');
const fs = require('fs');

/**
 * @desc Get all settings as key/value
 * @route GET /api/admin/settings
 * @access Private (Admin)
 */
exports.getSettings = async (req, res, next) => {
    try {
        const docs = await Setting.find();
        const result = {};
        docs.forEach((d) => (result[d.key] = d.value));
        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.error('❌ GetSettings error:', err.message);
        next(err);
    }
};

/**
 * @desc Update multiple settings (body: { key1: value1, key2: value2 })
 * @route PUT /api/admin/settings
 * @access Private (Admin)
 */
exports.updateSettings = async (req, res, next) => {
    try {
        const data = req.body || {};
        const keys = Object.keys(data);
        for (const key of keys) {
            await Setting.findOneAndUpdate(
                { key },
                { value: data[key] },
                { upsert: true, new: true }
            );
        }

        return res
            .status(200)
            .json({ success: true, message: 'Cập nhật settings thành công' });
    } catch (err) {
        console.error('❌ UpdateSettings error:', err.message);
        next(err);
    }
};

/**
 * @desc Backup selected collections to JSON file and return download URL
 * @route GET /api/admin/backup
 * @access Private (Admin)
 */
exports.backupDatabase = async (req, res, next) => {
    try {
        const users = await User.find()
            .select('-matKhau -resetPasswordToken -resetPasswordExpire')
            .lean();
        const companies = await Company.find().lean();
        const jobs = await JobPosting.find().lean();
        const applications = await Application.find().lean();
        const interviews = await Interview.find().lean();
        const notifications = await Notification.find().lean();
        const reports = await Report.find().lean();
        const activities = await Activity.find().lean();

        const payload = {
            generatedAt: new Date().toISOString(),
            counts: {
                users: users.length,
                companies: companies.length,
                jobs: jobs.length,
                applications: applications.length,
                interviews: interviews.length,
                notifications: notifications.length,
                reports: reports.length,
                activities: activities.length
            },
            users,
            companies,
            jobs,
            applications,
            interviews,
            notifications,
            reports,
            activities
        };

        const backupsDir = path.join(__dirname, '..', 'public', 'backups');
        try {
            fs.mkdirSync(backupsDir, { recursive: true });
        } catch (e) {
            // ignore
        }

        const filename = `backup-${new Date()
            .toISOString()
            .replace(/[:.]/g, '-')}.json`;
        const filepath = path.join(backupsDir, filename);
        fs.writeFileSync(filepath, JSON.stringify(payload, null, 2), 'utf8');

        const downloadUrl = `/backups/${filename}`; // assuming express serves /public

        return res
            .status(200)
            .json({ success: true, message: 'Backup created', downloadUrl });
    } catch (err) {
        console.error('❌ BackupDatabase error:', err.message);
        next(err);
    }
};
