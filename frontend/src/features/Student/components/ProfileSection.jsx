// ==================== ProfileSection.jsx ====================
import React from 'react';
import '../styles/ProfileSection.css';

const ProfileSection = ({
    name,
    email,
    phone,
    birthDate,
    address,
    major,
    avatar,
    onUpdateAvatar
}) => {
    return (
        <div className='profile-section'>
            <h2 className='profile-section__title'>Thông tin cá nhân</h2>

            <div className='profile-section__container'>
                <div className='profile-section__form'>
                    <div className='profile-section__row'>
                        <div className='profile-section__field'>
                            <label className='profile-section__label'>
                                Họ và tên
                            </label>
                            <input
                                type='text'
                                className='profile-section__input'
                                value={name || ''}
                                readOnly
                            />
                        </div>
                        <div className='profile-section__field'>
                            <label className='profile-section__label'>
                                Email
                            </label>
                            <input
                                type='email'
                                className='profile-section__input'
                                value={email || ''}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className='profile-section__row'>
                        <div className='profile-section__field'>
                            <label className='profile-section__label'>
                                Số điện thoại
                            </label>
                            <input
                                type='tel'
                                className='profile-section__input'
                                value={phone || ''}
                                readOnly
                            />
                        </div>
                        <div className='profile-section__field'>
                            <label className='profile-section__label'>
                                Ngày sinh
                            </label>
                            <input
                                type='date'
                                className='profile-section__input'
                                value={birthDate || ''}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className='profile-section__field'>
                        <label className='profile-section__label'>
                            Địa chỉ
                        </label>
                        <input
                            type='text'
                            className='profile-section__input'
                            value={address || ''}
                            readOnly
                        />
                    </div>
                </div>

                <div className='profile-section__sidebar'>
                    <div className='profile-section__avatar'>
                        {avatar ? (
                            <img src={avatar} alt={name} />
                        ) : (
                            <div className='profile-section__avatar-placeholder'>
                                <span>{name ? name.charAt(0) : 'U'}</span>
                            </div>
                        )}
                    </div>
                    <h3 className='profile-section__name'>{name}</h3>
                    <p className='profile-section__major'>{major}</p>
                    <button
                        className='profile-section__btn'
                        onClick={onUpdateAvatar}
                    >
                        Đổi ảnh đại diện
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
