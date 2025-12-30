// ==================== hooks/useProfile.js ====================
import { useState, useEffect } from 'react';
import api from '@services/api';

export const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            // Fetch current user profile from API
            const res = await api.get('/auth/me');
            // backend returns { success: true, user }
            if (res && res.success && res.user) {
                const u = res.user;
                setProfile({
                    id: u._id || u.id,
                    name: u.hoVaTen || u.name || u.ho_ten || u.ten || '',
                    email: u.email,
                    phone: u.soDienThoai || u.phone,
                    birthDate: u.ngaySinh || u.birthDate,
                    address: u.diaChi || u.address,
                    major: u.chuyenNganh || u.major,
                    avatar: u.avatar || null
                });

                // If backend exposes education/skills on user, use them
                if (u.hocVan) setEducation(u.hocVan);
                if (u.kyNang) setSkills(u.kyNang);
            } else {
                // fallback to empty
                setProfile(null);
                setEducation([]);
                setSkills([]);
            }
        } catch (err) {
            console.error('Failed to fetch profile:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateAvatar = async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            // If the backend supports avatar upload, call the endpoint
            const res = await api.postForm('/users/upload-avatar', formData);
            // backend returns { success: true, user }
            if (res && res.success && res.user) {
                const u = res.user;
                setProfile((prev) => ({ ...prev, avatar: u.avatar || u.hinhDaiDien || prev?.avatar }));
                return { success: true, user: u };
            } else {
                // fallback to local preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProfile((prev) => ({ ...prev, avatar: reader.result }));
                };
                reader.readAsDataURL(file);
            }
        } catch (err) {
            console.error('Failed to update avatar:', err);
        }
    };

    const updateProfile = async (updates) => {
        try {
            const res = await api.put('/auth/update-profile', updates);
            if (res && res.success && res.user) {
                const u = res.user;
                setProfile((prev) => ({ ...prev, name: u.hoVaTen || u.name || prev?.name }));
                return { success: true, user: u };
            }
            return { success: false };
        } catch (err) {
            console.error('Failed to update profile:', err);
            return { success: false, error: err?.message };
        }
    };

    const addSkill = async (skill) => {
        try {
            if (!skills.includes(skill)) {
                const newSkills = [...skills, skill];
                // persist to backend via update-profile endpoint
                await updateProfile({ kyNang: newSkills });
                setSkills(newSkills);
            }
        } catch (err) {
            console.error('Failed to add skill:', err);
        }
    };

    const removeSkill = async (skill) => {
        try {
            const newSkills = skills.filter((s) => s !== skill);
            await updateProfile({ kyNang: newSkills });
            setSkills(newSkills);
        } catch (err) {
            console.error('Failed to remove skill:', err);
        }
    };

    const addEducation = async (edu) => {
        try {
            const newEdu = [...(education || []), edu];
            await updateProfile({ hocVan: newEdu });
            setEducation(newEdu);
        } catch (err) {
            console.error('Failed to add education:', err);
        }
    };

    return {
        profile,
        education,
        skills,
        loading,
        updateAvatar,
        addSkill,
        removeSkill,
        addEducation,
        refetch: fetchProfile,
        updateProfile
    };
};
