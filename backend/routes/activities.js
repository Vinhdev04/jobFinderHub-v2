// backend/routes/activities.js
const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const { protect, authorize } = require('../middleware/auth');

/**
 * @route   GET /api/activities
 * @desc    Lấy danh sách activities
 * @access  Private (Admin only)
 */
router.get('/', protect, authorize('quan_tri_he_thong'), async (req, res) => {
    try {
        const {
            limit = 10,
            page = 1,
            userId,
            status,
            startDate,
            endDate
        } = req.query;

        console.log('📋 [Activities Route] Query params:', {
            limit,
            page,
            userId,
            status
        });

        // Build query
        const query = {};
        if (userId) query.user = userId;
        if (status) query.status = status;
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        console.log('🔍 [Activities Route] MongoDB query:', query);

        // Execute query
        const activities = await Activity.find(query)
            .populate('user', 'email hoVaTen')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .lean();

        const total = await Activity.countDocuments(query);

        console.log(
            `✅ [Activities Route] Found ${activities.length} activities (total: ${total})`
        );

        res.json({
            success: true,
            activities,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / parseInt(limit))
        });
    } catch (error) {
        console.error('❌ [Activities Route] Error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách activities',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/activities/export
 * @desc    Xuất activities ra file CSV
 * @access  Private (Admin only)
 */
router.get(
    '/export',
    protect,
    authorize('quan_tri_he_thong'),
    async (req, res) => {
        try {
            console.log('📥 [Activities Route] Exporting activities...');

            const activities = await Activity.find()
                .populate('user', 'email hoVaTen')
                .sort({ createdAt: -1 })
                .limit(1000) // Giới hạn 1000 records
                .lean();

            console.log(
                `✅ [Activities Route] Exporting ${activities.length} activities`
            );

            // Tạo CSV
            const csv = [
                [
                    'Thời gian',
                    'Người dùng',
                    'Email',
                    'Hành động',
                    'Method',
                    'Path',
                    'IP',
                    'Trạng thái'
                ].join(','),
                ...activities.map((a) =>
                    [
                        new Date(a.createdAt).toLocaleString('vi-VN'),
                        a.user?.hoVaTen || '',
                        a.userEmail || a.user?.email || '',
                        a.action || '',
                        a.method || '',
                        a.path || '',
                        a.ip || '',
                        a.status || ''
                    ]
                        .map(
                            (field) => `"${String(field).replace(/"/g, '""')}"`
                        )
                        .join(',')
                )
            ].join('\n');

            res.setHeader('Content-Type', 'text/csv; charset=utf-8');
            res.setHeader(
                'Content-Disposition',
                `attachment; filename=activities-${Date.now()}.csv`
            );
            res.send('\uFEFF' + csv); // BOM for Excel UTF-8
        } catch (error) {
            console.error('❌ [Activities Route] Export error:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi xuất activities',
                error: error.message
            });
        }
    }
);

/**
 * @route   GET /api/activities/stats
 * @desc    Thống kê activities
 * @access  Private (Admin only)
 */
router.get(
    '/stats',
    protect,
    authorize('quan_tri_he_thong'),
    async (req, res) => {
        try {
            console.log('📊 [Activities Route] Getting stats...');

            const stats = await Activity.aggregate([
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                }
            ]);

            const total = await Activity.countDocuments();

            const today = await Activity.countDocuments({
                createdAt: {
                    $gte: new Date(new Date().setHours(0, 0, 0, 0))
                }
            });

            const thisWeek = await Activity.countDocuments({
                createdAt: {
                    $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                }
            });

            console.log('✅ [Activities Route] Stats:', {
                total,
                today,
                thisWeek
            });

            res.json({
                success: true,
                total,
                today,
                thisWeek,
                byStatus: stats.reduce((acc, s) => {
                    acc[s._id] = s.count;
                    return acc;
                }, {})
            });
        } catch (error) {
            console.error('❌ [Activities Route] Stats error:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy thống kê',
                error: error.message
            });
        }
    }
);

/**
 * @route   POST /api/activities/test
 * @desc    Tạo activity test (for development only)
 * @access  Private
 */
router.post('/test', protect, async (req, res) => {
    try {
        if (process.env.NODE_ENV === 'production') {
            return res.status(403).json({
                success: false,
                message: 'Route này chỉ dùng trong development'
            });
        }

        console.log('🧪 [Activities Route] Creating test activity...');

        const testActivity = await Activity.create({
            user: req.user._id,
            userEmail: req.user.email || req.user.hoVaTen,
            action: 'Test activity - ' + new Date().toLocaleTimeString(),
            method: 'POST',
            path: '/api/activities/test',
            ip: req.ip || req.connection.remoteAddress,
            status: 'success',
            details: { test: true }
        });

        console.log(
            '✅ [Activities Route] Test activity created:',
            testActivity._id
        );

        res.json({
            success: true,
            message: 'Tạo test activity thành công',
            activity: testActivity
        });
    } catch (error) {
        console.error('❌ [Activities Route] Test error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi tạo test activity',
            error: error.message
        });
    }
});

/**
 * @route   DELETE /api/activities
 * @desc    Xóa tất cả activities (for development only)
 * @access  Private (Admin only)
 */
router.delete(
    '/',
    protect,
    authorize('quan_tri_he_thong'),
    async (req, res) => {
        try {
            // Chỉ cho phép trong development
            if (process.env.NODE_ENV === 'production') {
                return res.status(403).json({
                    success: false,
                    message: 'Không thể xóa activities trong production'
                });
            }

            console.log('🗑️ [Activities Route] Deleting all activities...');

            const result = await Activity.deleteMany({});

            console.log(
                `✅ [Activities Route] Deleted ${result.deletedCount} activities`
            );

            res.json({
                success: true,
                message: `Đã xóa ${result.deletedCount} activities`,
                deletedCount: result.deletedCount
            });
        } catch (error) {
            console.error('❌ [Activities Route] Delete error:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi xóa activities',
                error: error.message
            });
        }
    }
);

module.exports = router;
