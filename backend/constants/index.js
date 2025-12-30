// backend/constants/index.js

/**
 * User Types / Loại Tài Khoản
 */
exports.USER_TYPES = {
    CANDIDATE: 'ung_vien',           // Ứng viên
    RECRUITER: 'nha_tuyen_dung',     // Nhà tuyển dụng
    ADMIN: 'admin'                    // Admin
};

/**
 * User Status / Trạng Thái Tài Khoản
 */
exports.USER_STATUS = {
    ACTIVE: 'hoat_dong',              // Hoạt động
    LOCKED: 'bi_khoa'                 // Bị khóa
};

/**
 * Job Types / Loại Công Việc
 */
exports.JOB_TYPES = {
    INTERNSHIP: 'thuc_tap',           // Thực tập
    FULL_TIME: 'toan_thoi_gian',      // Toàn thời gian
    PART_TIME: 'ban_thoi_gian'        // Bán thời gian
};

/**
 * Job Posting Status / Trạng Thái Bài Đăng
 */
exports.JOB_STATUS = {
    OPENING: 'dang_mo_don',           // Đang mở đơn
    PENDING_APPROVAL: 'cho_duyet',    // Chờ duyệt
    APPROVED: 'da_duyet',             // Đã duyệt
    CLOSED: 'da_dong'                 // Đã đóng
};

/**
 * Application Status / Trạng Thái Đơn Ứng Tuyển
 */
exports.APPLICATION_STATUS = {
    REVIEWING: 'dang_xem_xet',        // Đang xem xét
    INVITED: 'duoc_moi_phong_van',    // Được mời phỏng vấn
    ACCEPTED: 'da_nhan',              // Đã nhận
    REJECTED: 'tu_choi'               // Từ chối
};

/**
 * Interview Status / Trạng Thái Phỏng Vấn
 */
exports.INTERVIEW_STATUS = {
    SCHEDULED: 'da_hen',              // Đã hẹn
    WAITING: 'dang_cho',              // Đang chờ
    COMPLETED: 'hoan_thanh',          // Hoàn thành
    CANCELLED: 'huy'                  // Hủy
};

/**
 * Interview Type / Hình Thức Phỏng Vấn
 */
exports.INTERVIEW_TYPE = {
    ONLINE: 'truc_tuyen',             // Trực tuyến
    OFFLINE: 'truc_tiep'              // Trực tiếp
};

/**
 * Interview Decision / Quyết Định Phỏng Vấn
 */
exports.INTERVIEW_DECISION = {
    ACCEPTED: 'tuyen',                // Được nhận
    REJECTED: 'khong_tuyen',          // Không được nhận
    NEED_RETAKE: 'can_phong_van_lai'  // Cần phỏng vấn lại
};

/**
 * Company Size / Quy Mô Công Ty
 */
exports.COMPANY_SIZES = {
    SMALL: '1-50',
    MEDIUM: '51-200',
    LARGE: '201-500',
    ENTERPRISE: '501-1000',
    GIANT: '1000+'
};

/**
 * Company Status / Trạng Thái Công Ty
 */
exports.COMPANY_STATUS = {
    ACTIVE: 'hoat_dong',              // Hoạt động
    INACTIVE: 'tam_dung'              // Tạm dừng
};

/**
 * Notification Types / Loại Thông Báo
 */
exports.NOTIFICATION_TYPES = {
    NEW_APPLICATION: 'ung_tuyen_moi',          // Ứng tuyển mới
    INTERVIEW_INVITATION: 'moi_phong_van',     // Mời phỏng vấn
    STATUS_CHANGED: 'thay_doi_trang_thai',     // Thay đổi trạng thái
    NEW_JOB: 'tin_tuyen_dung_moi',             // Bài đăng mới
    INTERVIEW_RESULT: 'ket_qua_phong_van',     // Kết quả phỏng vấn
    SYSTEM: 'he_thong'                         // Hệ thống
};

/**
 * Report Types / Loại Báo Cáo
 */
exports.REPORT_TYPES = {
    WEEKLY: 'tuan',                   // Hàng tuần
    MONTHLY: 'thang',                 // Hàng tháng
    QUARTERLY: 'quy',                 // Hàng quý
    YEARLY: 'nam'                     // Hàng năm
};

/**
 * Report Status / Trạng Thái Báo Cáo
 */
exports.REPORT_STATUS = {
    PROCESSING: 'dang_xu_ly',         // Đang xử lý
    COMPLETED: 'hoan_thanh'           // Hoàn thành
};

/**
 * File Types / Loại File
 */
exports.FILE_TYPES = {
    PDF: 'PDF',
    EXCEL: 'Excel',
    CSV: 'CSV',
    DOC: 'DOC'
};

/**
 * Salary Currency / Tiền Tệ Lương
 */
exports.CURRENCIES = {
    VND: 'VND',
    USD: 'USD',
    EUR: 'EUR'
};

/**
 * Validation Rules / Quy Tắc Xác Thực
 */
exports.VALIDATION_RULES = {
    MIN_PASSWORD_LENGTH: 6,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 5000,
    MIN_SALARY: 1000000,              // 1 triệu VND
    MAX_SALARY: 10000000000,           // 10 tỷ VND
    MAX_FILE_SIZE: 10485760,           // 10MB
    TOKEN_EXPIRY: '7d',
    REFRESH_TOKEN_EXPIRY: '30d'
};

/**
 * API Status Codes / Mã Trạng Thái
 */
exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500
};

/**
 * Pagination / Phân Trang
 */
exports.PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100
};

/**
 * Industries / Ngành Nghề
 */
exports.INDUSTRIES = [
    'Công nghệ thông tin',
    'Tài chính - Ngân hàng',
    'Bán hàng - Marketing',
    'Giáo dục - Đào tạo',
    'Y tế - Dược',
    'Xây dựng',
    'Sản xuất',
    'Logistics - Vận tải',
    'Du lịch - Khách sạn',
    'Bất động sản',
    'Âm thực',
    'Khác'
];

/**
 * Skills / Kỹ Năng Thường Gặp
 */
exports.POPULAR_SKILLS = [
    'JavaScript',
    'React',
    'Node.js',
    'MongoDB',
    'Python',
    'Java',
    'SQL',
    'Git',
    'Docker',
    'AWS',
    'Communication',
    'Problem Solving',
    'Team Work',
    'Leadership',
    'Project Management'
];