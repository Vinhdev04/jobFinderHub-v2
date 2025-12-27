// ==================== CVPreview.jsx ====================
import React from 'react';
import '../styles/CVPreview.css';

const CVPreview = ({
    fileName,
    uploadDate,
    fileSize,
    onDownload,
    onReplace
}) => {
    return (
        <div className='cv-preview'>
            <div className='cv-preview__icon'>📄</div>
            <div className='cv-preview__info'>
                <h4 className='cv-preview__name'>{fileName}</h4>
                <p className='cv-preview__meta'>
                    Cập nhật: {uploadDate} • {fileSize}
                </p>
            </div>
            <div className='cv-preview__actions'>
                {onDownload && (
                    <button className='cv-preview__btn' onClick={onDownload}>
                        Tải xuống
                    </button>
                )}
                {onReplace && (
                    <button
                        className='cv-preview__btn cv-preview__btn--primary'
                        onClick={onReplace}
                    >
                        Thay thế
                    </button>
                )}
            </div>
        </div>
    );
};

export default CVPreview;
