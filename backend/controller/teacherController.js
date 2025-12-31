const Teacher = require('../models/Teacher');
const Activity = require('../models/Activity');

// GET /api/teachers
exports.getTeachers = async (req, res, next) => {
    try {
        const { limit = 20, page = 1, q } = req.query;
        const query = {};
        if (q) {
            query.$or = [
                { hoVaTen: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } },
                { maGiaoVien: { $regex: q, $options: 'i' } }
            ];
        }

        const total = await Teacher.countDocuments(query);
        const teachers = await Teacher.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .lean();

        res.json({
            success: true,
            teachers,
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        });
    } catch (err) {
        next(err);
    }
};

// GET /api/teachers/:id
exports.getTeacherById = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id).lean();
        if (!teacher)
            return res
                .status(404)
                .json({ success: false, message: 'Teacher not found' });
        res.json({ success: true, teacher });
    } catch (err) {
        next(err);
    }
};

// POST /api/teachers
exports.createTeacher = async (req, res, next) => {
    try {
        const data = req.body || {};
        const teacher = await Teacher.create(data);

        // optional activity log
        try {
            await Activity.create({
                user: req.user && req.user._id,
                userEmail: req.user && req.user.email,
                action: 'Created teacher',
                method: 'POST',
                path: '/api/teachers',
                ip: req.ip,
                status: 'success',
                details: { teacherId: teacher._id }
            });
        } catch (e) {
            console.warn('Activity log failed:', e.message);
        }

        res.status(201).json({
            success: true,
            message: 'Teacher created',
            teacher
        });
    } catch (err) {
        next(err);
    }
};

// PUT /api/teachers/:id
exports.updateTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!teacher)
            return res
                .status(404)
                .json({ success: false, message: 'Teacher not found' });

        try {
            await Activity.create({
                user: req.user && req.user._id,
                userEmail: req.user && req.user.email,
                action: 'Updated teacher',
                method: 'PUT',
                path: `/api/teachers/${req.params.id}`,
                ip: req.ip,
                status: 'success',
                details: { teacherId: teacher._id }
            });
        } catch (e) {
            console.warn('Activity log failed:', e.message);
        }

        res.json({ success: true, message: 'Teacher updated', teacher });
    } catch (err) {
        next(err);
    }
};

// DELETE /api/teachers/:id
exports.deleteTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher)
            return res
                .status(404)
                .json({ success: false, message: 'Teacher not found' });

        try {
            await Activity.create({
                user: req.user && req.user._id,
                userEmail: req.user && req.user.email,
                action: 'Deleted teacher',
                method: 'DELETE',
                path: `/api/teachers/${req.params.id}`,
                ip: req.ip,
                status: 'success',
                details: { teacherId: req.params.id }
            });
        } catch (e) {
            console.warn('Activity log failed:', e.message);
        }

        res.json({ success: true, message: 'Teacher deleted' });
    } catch (err) {
        next(err);
    }
};
