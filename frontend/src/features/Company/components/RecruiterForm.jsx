import React, { useState } from 'react';

export default function RecruiterForm({
    initialData = {},
    onSave,
    onCancel,
    saving
}) {
    const [name, setName] = useState(
        initialData.hoVaTen || initialData.name || ''
    );
    const [email, setEmail] = useState(initialData.email || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ hoVaTen: name, email });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label>Tên</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Họ và tên'
                />

                <label>Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                />

                <div style={{ marginTop: 12 }}>
                    <button type='submit' disabled={saving}>
                        {saving ? 'Đang lưu...' : 'Lưu'}
                    </button>
                    <button
                        type='button'
                        onClick={onCancel}
                        style={{ marginLeft: 8 }}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </form>
    );
}
