// src/components/common/Footer/Footer.jsx

import React from 'react';
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    Facebook,
    Linkedin,
    Twitter,
    Youtube
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const footerLinks = {
        product: [
            { label: 'Tìm việc làm', href: '#jobs' },
            { label: 'Tin tức', href: '#news' },
            { label: 'Giới thiệu', href: '#about' },
            { label: 'Liên hệ', href: '#contact' }
        ],
        support: [
            { label: 'Trung tâm trợ giúp', href: '#help' },
            { label: 'Câu hỏi thường gặp', href: '#faq' },
            { label: 'Điều khoản sử dụng', href: '#terms' },
            { label: 'Chính sách bảo mật', href: '#privacy' }
        ],
        company: [
            { label: 'Về chúng tôi', href: '#about-us' },
            { label: 'Đội tác', href: '#team' },
            { label: 'Tuyển dụng', href: '#careers' },
            { label: 'Blog', href: '#blog' }
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Youtube, href: '#', label: 'Youtube' }
    ];

    return (
        <footer className='footer'>
            <div className='container'>
                <div className='footer-content'>
                    {/* Brand Section */}
                    <div className='footer-brand'>
                        <div className='footer-logo'>
                            <div className='footer-logo-icon'>
                                <Building2 className='icon' />
                            </div>
                            <div>
                                <h3 className='footer-logo-title'>
                                    Hệ thống quản lý thực tập
                                </h3>
                                <p className='footer-logo-subtitle'>
                                    Kết nối cơ hội nghề nghiệp
                                </p>
                            </div>
                        </div>
                        <p className='footer-description'>
                            Nền tảng kết nối chất chẽ giữa Nhà trường - Doanh
                            nghiệp - Sinh viên với cơ chế phân quyền chuyên
                            nghiệp và bảo mật cao.
                        </p>
                        <div className='footer-social'>
                            {socialLinks.map((social, idx) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        className='social-link'
                                        aria-label={social.label}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className='footer-links'>
                        <div className='footer-links-column'>
                            <h4 className='footer-links-title'>Sản phẩm</h4>
                            {footerLinks.product.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.href}
                                    className='footer-link'
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <div className='footer-links-column'>
                            <h4 className='footer-links-title'>Hỗ trợ</h4>
                            {footerLinks.support.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.href}
                                    className='footer-link'
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <div className='footer-links-column'>
                            <h4 className='footer-links-title'>Công ty</h4>
                            {footerLinks.company.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.href}
                                    className='footer-link'
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className='footer-contact'>
                    <div className='contact-item'>
                        <MapPin className='contact-icon' />
                        <div>
                            <h5 className='contact-title'>Địa chỉ</h5>
                            <p className='contact-text'>
                                123 Đường ABC, Quận XYZ, Hà Nội
                            </p>
                        </div>
                    </div>

                    <div className='contact-item'>
                        <Phone className='contact-icon' />
                        <div>
                            <h5 className='contact-title'>Điện thoại</h5>
                            <p className='contact-text'>+84 123 456 789</p>
                        </div>
                    </div>

                    <div className='contact-item'>
                        <Mail className='contact-icon' />
                        <div>
                            <h5 className='contact-title'>Email</h5>
                            <p className='contact-text'>
                                contact@internship.vn
                            </p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className='footer-bottom'>
                    <p className='copyright'>
                        © 2024 Hệ thống quản lý đăng ký thực tập & tuyển dụng.
                        All rights reserved.
                    </p>
                    <div className='footer-bottom-links'>
                        <a href='#terms'>Điều khoản</a>
                        <a href='#privacy'>Bảo mật</a>
                        <a href='#powered'>Powered by Readdy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
