// backend/controllers/notificationController.js
const Notification = require('../models/Notification');

/**
 * @desc    Lấy thông báo của người dùng
 * @route   GET /api/notifications
 * @access  Private
 */
exports.getNotifications = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, daDoc } = req.query;

        const filter = { nguoiNhan: req.user.id };

        if (daDoc !== undefined) {
            filter.daDoc = daDoc === 'true';
        }

        const notifications = await Notification.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Notification.countDocuments(filter);

        // Đếm số thông báo chưa đọc
        const unreadCount = await Notification.countDocuments({
            nguoiNhan: req.user.id,
            daDoc: false
        });

        return res.status(200).json({
            success: true,
            data: notifications,
            unreadCount,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('❌ GetNotifications error:', error);
        next(error);
    }
};

/**
 * @desc    Đánh dấu thông báo đã đọc
 * @route   PUT /api/notifications/:id/read
 * @access  Private
 */
exports.markAsRead = async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thông báo'
            });
        }

        // Kiểm tra quyền
        if (notification.nguoiNhan.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền truy cập thông báo này'
            });
        }

        notification.daDoc = true;
        notification.thoiGianDoc = new Date();
        await notification.save();

        return res.status(200).json({
            success: true,
            message: 'Đánh dấu đã đọc thành công',
            data: notification
        });

    } catch (error) {
        console.error('❌ MarkAsRead error:', error);
        next(error);
    }
};

/**
 * @desc    Đánh dấu tất cả thông báo đã đọc
 * @route   PUT /api/notifications/mark-all-read
 * @access  Private
 */
exports.markAllAsRead = async (req, res, next) => {
    try {
        const result = await Notification.updateMany(
            {
                nguoiNhan: req.user.id,
                daDoc: false
            },
            {
                daDoc: true,
                thoiGianDoc: new Date()
            }
        );

        return res.status(200).json({
            success: true,
            message: 'Đánh dấu tất cả thông báo đã đọc',
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        console.error('❌ MarkAllAsRead error:', error);
        next(error);
    }
};

/**
 * @desc    Xóa thông báo
 * @route   DELETE /api/notifications/:id
 * @access  Private
 */
exports.deleteNotification = async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thông báo'
            });
        }

        // Kiểm tra quyền
        if (notification.nguoiNhan.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền xóa thông báo này'
            });
        }

        await Notification.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Xóa thông báo thành công'
        });

    } catch (error) {
        console.error('❌ DeleteNotification error:', error);
        next(error);
    }
};

/**
 * @desc    Tạo thông báo (Internal - dùng từ các service khác)
 * @route   POST /api/notifications/create (Internal only)
 * @access  Private (System)
 */
exports.createNotification = async (req, res, next) => {
    try {
        const {
            nguoiNhan,
            tieuDe,
            noiDung,
            loai,
            lienKet,
            duLieuBoSung
        } = req.body;

        if (!nguoiNhan || !tieuDe || !noiDung || !loai) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }

        const notification = await Notification.create({
            nguoiNhan,
            tieuDe,
            noiDung,
            loai,
            lienKet,
            duLieuBoSung
        });

        return res.status(201).json({
            success: true,
            message: 'Tạo thông báo thành công',
            data: notification
        });

    } catch (error) {
        console.error('❌ CreateNotification error:', error);
        next(error);
    }
};

/**
 * @desc    Xóa tất cả thông báo đã đọc của người dùng
 * @route   DELETE /api/notifications/delete-read
 * @access  Private
 */
exports.deleteAllReadNotifications = async (req, res, next) => {
    try {
        const result = await Notification.deleteMany({
            nguoiNhan: req.user.id,
            daDoc: true
        });

        return res.status(200).json({
            success: true,
            message: 'Xóa tất cả thông báo đã đọc',
            deletedCount: result.deletedCount
        });

    } catch (error) {
        console.error('❌ DeleteAllReadNotifications error:', error);
        next(error);
    }
};