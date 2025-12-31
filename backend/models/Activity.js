// backend/models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true // Index để query nhanh
        },
        userEmail: {
            type: String,
            required: true
        },
        action: {
            type: String,
            required: true
        },
        method: {
            type: String,
            required: true,
            enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
        },
        path: {
            type: String,
            required: true
        },
        ip: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['success', 'error', 'warning'],
            default: 'success',
            index: true
        },
        details: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    {
        timestamps: true // Tự động tạo createdAt và updatedAt
    }
);

// Indexes để query nhanh hơn
activitySchema.index({ user: 1, createdAt: -1 });
activitySchema.index({ createdAt: -1 });
activitySchema.index({ status: 1, createdAt: -1 });

// Virtual để format thời gian
activitySchema.virtual('formattedTime').get(function () {
    return this.createdAt.toLocaleString('vi-VN');
});

// Static method để tạo activity log
activitySchema.statics.log = async function (data) {
    try {
        const activity = await this.create(data);
        console.log(`✅ [Activity Model] Logged: ${data.action}`);
        return activity;
    } catch (error) {
        console.error('❌ [Activity Model] Error logging activity:', error);
        throw error;
    }
};

// Static method để lấy activities của user
activitySchema.statics.getUserActivities = async function (userId, limit = 10) {
    return this.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
};

// Static method để lấy stats
activitySchema.statics.getStats = async function (startDate, endDate) {
    const query = {};
    if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const [total, byStatus, byUser] = await Promise.all([
        this.countDocuments(query),
        this.aggregate([
            { $match: query },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]),
        this.aggregate([
            { $match: query },
            { $group: { _id: '$user', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ])
    ]);

    return {
        total,
        byStatus: byStatus.reduce((acc, s) => {
            acc[s._id] = s.count;
            return acc;
        }, {}),
        topUsers: byUser
    };
};

// Middleware để log khi document được tạo
activitySchema.post('save', function (doc) {
    console.log(`💾 [Activity Model] Saved activity: ${doc._id}`);
});

module.exports = mongoose.model('Activity', activitySchema);
