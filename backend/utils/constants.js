
// User roles
exports.USER_ROLES = {
    STUDENT: 'sinh_vien',
    ACADEMIC_STAFF: 'giao_vu',
    RECRUITER: 'nhan_vien_tuyen_dung',
    COMPANY_MANAGER: 'quan_ly_doanh_nghiep',
    ADMIN: 'quan_tri_he_thong'
};

// User status
exports.USER_STATUS = {
    ACTIVE: 'hoat_dong',
    SUSPENDED: 'tam_khoa',
    BANNED: 'khoa'
};

// Job types
exports.JOB_TYPES = {
    INTERNSHIP: 'thuc_tap',
    FULL_TIME: 'toan_thoi_gian',
    PART_TIME: 'ban_thoi_gian',
    FREELANCE: 'tu_do'
};

// Job status
exports.JOB_STATUS = {
    PENDING: 'cho_duyet',
    APPROVED: 'da_duyet',
    REJECTED: 'tu_choi',
    CLOSED: 'da_dong'
};

// Application status
exports.APPLICATION_STATUS = {
    PENDING: 'cho_duyet',
    REVIEWING: 'dang_xem_xet',
    INTERVIEW: 'phong_van',
    ACCEPTED: 'chap_nhan',
    REJECTED: 'tu_choi'
};

// Interview status
exports.INTERVIEW_STATUS = {
    SCHEDULED: 'da_hen',
    COMPLETED: 'hoan_thanh',
    CANCELLED: 'huy_bo',
    RESCHEDULED: 'doi_lich'
};

// Error messages
exports.ERROR_MESSAGES = {
    UNAUTHORIZED: 'Vui lòng đăng nhập để truy cập',
    FORBIDDEN: 'Bạn không có quyền truy cập',
    NOT_FOUND: 'Không tìm thấy tài nguyên',
    VALIDATION_ERROR: 'Dữ liệu không hợp lệ',
    SERVER_ERROR: 'Lỗi server',
    EMAIL_EXISTS: 'Email đã được sử dụng',
    INVALID_CREDENTIALS: 'Email hoặc mật khẩu không đúng',
    ACCOUNT_LOCKED: 'Tài khoản đã bị khóa',
    TOKEN_EXPIRED: 'Token đã hết hạn',
    INVALID_TOKEN: 'Token không hợp lệ'
};

// Success messages
exports.SUCCESS_MESSAGES = {
    REGISTER_SUCCESS: 'Đăng ký thành công',
    LOGIN_SUCCESS: 'Đăng nhập thành công',
    LOGOUT_SUCCESS: 'Đăng xuất thành công',
    PASSWORD_RESET_EMAIL_SENT: 'Email hướng dẫn đặt lại mật khẩu đã được gửi',
    PASSWORD_RESET_SUCCESS: 'Đặt lại mật khẩu thành công',
    PASSWORD_CHANGE_SUCCESS: 'Đổi mật khẩu thành công',
    PROFILE_UPDATE_SUCCESS: 'Cập nhật thông tin thành công'
};