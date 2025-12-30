const Activity = require('../models/Activity');

// GET /api/activities
exports.getActivities = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const search = req.query.search || null;
    const status = req.query.status || null;
    const from = req.query.from ? new Date(req.query.from) : null;
    const to = req.query.to ? new Date(req.query.to) : null;

    const filter = {};
    if (search) {
      filter.$or = [
        { action: { $regex: search, $options: 'i' } },
        { userEmail: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) filter.status = status;
    if (from || to) filter.createdAt = {};
    if (from) filter.createdAt.$gte = from;
    if (to) filter.createdAt.$lte = to;

    const total = await Activity.countDocuments(filter);
    const pages = Math.ceil(total / limit) || 1;

    const activities = await Activity.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('user', 'hoVaTen email');

    res.json({
      success: true,
      data: { activities, pagination: { page, limit, total, pages } }
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/activities/export
exports.exportActivities = async (req, res, next) => {
  try {
    const search = req.query.search || null;
    const status = req.query.status || null;
    const from = req.query.from ? new Date(req.query.from) : null;
    const to = req.query.to ? new Date(req.query.to) : null;

    const filter = {};
    if (search) {
      filter.$or = [
        { action: { $regex: search, $options: 'i' } },
        { userEmail: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) filter.status = status;
    if (from || to) filter.createdAt = {};
    if (from) filter.createdAt.$gte = from;
    if (to) filter.createdAt.$lte = to;

    const items = await Activity.find(filter).sort({ createdAt: -1 }).populate('user', 'hoVaTen email');

    // Build CSV
    const headers = ['timestamp', 'action', 'userEmail', 'userName', 'ip', 'status', 'meta'];
    const rows = items.map((it) => {
      return [
        it.createdAt.toISOString(),
        (it.action || '').replace(/"/g, '""'),
        it.userEmail || (it.user && it.user.email) || '',
        it.user && it.user.hoVaTen ? it.user.hoVaTen.replace(/"/g, '""') : '',
        it.ip || '',
        it.status || '',
        it.meta ? JSON.stringify(it.meta).replace(/"/g, '""') : ''
      ]
        .map((v) => `"${v}"`)
        .join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="activity_logs_${Date.now()}.csv"`);
    res.send(csv);
  } catch (err) {
    next(err);
  }
};
