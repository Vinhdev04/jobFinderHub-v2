/*
Email service
- sendWelcomeEmail
- sendApplicationConfirmation
- sendInterviewInvitation
- sendStatusUpdate
- sendPasswordReset
*/

// ============================================
// backend/utils/sendEmail.js
// ============================================
const nodemailer = require('nodemailer');

// Tạo transporter
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

/**
 * Gửi email chào mừng
 */
exports.sendWelcomeEmail = async (email, hoVaTen) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Chào mừng đến với JobFinderHub',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #14b8a6;">Chào mừng ${hoVaTen}!</h2>
                <p>Cảm ơn bạn đã đăng ký tài khoản tại JobFinderHub.</p>
                <p>Bạn có thể bắt đầu khám phá các cơ hội việc làm và thực tập ngay bây giờ.</p>
                <a href="${process.env.FRONTEND_URL}" 
                   style="display: inline-block; padding: 12px 24px; background: #14b8a6; 
                          color: white; text-decoration: none; border-radius: 8px; margin-top: 16px;">
                    Khám phá ngay
                </a>
                <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px;">
                    Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.
                </p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

/**
 * Gửi email reset password
 */
exports.sendPasswordResetEmail = async (email, hoVaTen, resetUrl) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Đặt lại mật khẩu - JobFinderHub',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #14b8a6;">Xin chào ${hoVaTen}!</h2>
                <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
                <p>Vui lòng nhấp vào nút bên dưới để đặt lại mật khẩu:</p>
                <a href="${resetUrl}" 
                   style="display: inline-block; padding: 12px 24px; background: #14b8a6; 
                          color: white; text-decoration: none; border-radius: 8px; margin-top: 16px;">
                    Đặt lại mật khẩu
                </a>
                <p style="margin-top: 24px; color: #6b7280;">
                    Hoặc copy đường link sau vào trình duyệt:<br>
                    <span style="color: #14b8a6;">${resetUrl}</span>
                </p>
                <p style="color: #ef4444; font-size: 14px; margin-top: 24px;">
                    ⚠️ Link này chỉ có hiệu lực trong 10 phút.
                </p>
                <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px;">
                    Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
                    Tài khoản của bạn vẫn an toàn.
                </p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

/**
 * Gửi email xác nhận đơn ứng tuyển
 */
exports.sendApplicationConfirmation = async (email, hoVaTen, jobTitle) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Xác nhận đơn ứng tuyển - ${jobTitle}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #14b8a6;">Xin chào ${hoVaTen}!</h2>
                <p>Chúng tôi đã nhận được đơn ứng tuyển của bạn cho vị trí:</p>
                <h3 style="color: #1f2937;">${jobTitle}</h3>
                <p>Đơn ứng tuyển của bạn đang được xem xét. Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
                <a href="${process.env.FRONTEND_URL}/applications" 
                   style="display: inline-block; padding: 12px 24px; background: #14b8a6; 
                          color: white; text-decoration: none; border-radius: 8px; margin-top: 16px;">
                    Xem đơn ứng tuyển
                </a>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

/**
 * Gửi email thông báo phỏng vấn
 */
exports.sendInterviewInvitation = async (email, hoVaTen, jobTitle, interviewDate, interviewLocation) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Mời phỏng vấn - ${jobTitle}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #14b8a6;">Chúc mừng ${hoVaTen}!</h2>
                <p>Bạn đã được mời tham gia phỏng vấn cho vị trí:</p>
                <h3 style="color: #1f2937;">${jobTitle}</h3>
                <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
                    <p style="margin: 8px 0;"><strong>Thời gian:</strong> ${interviewDate}</p>
                    <p style="margin: 8px 0;"><strong>Địa điểm:</strong> ${interviewLocation}</p>
                </div>
                <p>Vui lòng xác nhận tham dự và chuẩn bị tốt cho buổi phỏng vấn.</p>
                <a href="${process.env.FRONTEND_URL}/interviews" 
                   style="display: inline-block; padding: 12px 24px; background: #14b8a6; 
                          color: white; text-decoration: none; border-radius: 8px; margin-top: 16px;">
                    Xem chi tiết
                </a>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};
