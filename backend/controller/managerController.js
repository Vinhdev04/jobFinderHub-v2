const Manager = require('../models/Manager');
const Activity = require('../models/Activity');

exports.getManagers = async (req, res, next) => {
    try {
        const { limit = 20, page = 1, q } = req.query;
        const query = {};
        if (q) {
            query.$or = [
                { hoVaTen: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } },
                { maNhanVien: { $regex: q, $options: 'i' } }
            ];
        }

        const total = await Manager.countDocuments(query);
        const managers = await Manager.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .lean();

        res.json({
            success: true,
            managers,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        });
    } catch (err) {
        next(err);
    }
};

exports.getManagerById = async (req, res, next) => {
    try {
        const manager = await Manager.findById(req.params.id).lean();
        if (!manager)
            return res
                .status(404)
                .json({ success: false, message: 'Manager not found' });
        res.json({ success: true, manager });
    } catch (err) {
        next(err);
    }
};

exports.createManager = async (req, res, next) => {
    try {
        const data = req.body || {};
        const manager = await Manager.create(data);
        try {
            await Activity.create({
                user: req.user && req.user._id,
                userEmail: req.user && req.user.email,
                action: 'Created manager',
                method: 'POST',
                path: '/api/managers',
                ip: req.ip,
                status: 'success',
                details: { managerId: manager._id }
            });
        } catch (e) {
            console.warn('Activity log failed:', e.message);
        }
        res.status(201).json({
            success: true,
            message: 'Manager created',
            manager
        });
    } catch (err) {
        next(err);
    }
};

exports.updateManager = async (req, res, next) => {
    try {
        const manager = await Manager.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!manager)
            return res
                .status(404)
                .json({ success: false, message: 'Manager not found' });
        try {
            await Activity.create({
                user: req.user && req.user._id,
                userEmail: req.user && req.user.email,
                action: 'Updated manager',
                method: 'PUT',
                path: `/api/managers/${req.params.id}`,
                ip: req.ip,
                status: 'success',
                details: { managerId: manager._id }
            });
        } catch (e) {
            console.warn('Activity log failed:', e.message);
        }
        res.json({ success: true, message: 'Manager updated', manager });
    } catch (err) {
        next(err);
    }
};

exports.deleteManager = async (req, res, next) => {
    try {
        const manager = await Manager.findByIdAndDelete(req.params.id);
        if (!manager)
            return res
                .status(404)
                .json({ success: false, message: 'Manager not found' });
        try {
            await Activity.create({
                user: req.user && req.user._id,
                userEmail: req.user && req.user.email,
                action: 'Deleted manager',
                method: 'DELETE',
                path: `/api/managers/${req.params.id}`,
                ip: req.ip,
                status: 'success',
                details: { managerId: req.params.id }
            });
        } catch (e) {
            console.warn('Activity log failed:', e.message);
        }
        res.json({ success: true, message: 'Manager deleted' });
    } catch (err) {
        next(err);
    }
};
