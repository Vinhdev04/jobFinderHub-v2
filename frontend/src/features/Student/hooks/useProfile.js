// ==================== hooks/useProfile.js ====================
import { useState, useEffect } from 'react';
import api from '@services/api';
import { normalizeUser } from '@utils/normalizeUser';

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
                const u = normalizeUser(res.user) || res.user;
                setProfile({
                    id: u.id || u._id,
                    name: u.hoVaTen || '',
                    email: u.email || '',
                    phone: u.soDienThoai || '',
                    birthDate: u.birthDate || null,
                    address: u.diaChi || '',
                    major: u.major || '',
                    avatar: u.avatar || null,
                    cv: u.cv || null
                });

                setEducation(Array.isArray(u.hocVan) ? u.hocVan : []);
                setSkills(Array.isArray(u.kyNang) ? u.kyNang : []);
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
                // refresh full profile from server
                await fetchProfile();
                return { success: true, user: res.user };
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

    const updateCV = async (file) => {
        const formData = new FormData();
        formData.append('cv', file);
        try {
            const res = await api.postForm('/users/upload-cv', formData);
            if (res && res.success && res.user) {
                await fetchProfile();
                return { success: true, user: res.user };
            }
            return { success: false };
        } catch (err) {
            console.error('Failed to upload CV:', err);
            return { success: false, error: err };
        }
    };

    const updateProfile = async (updates) => {
        try {
            const res = await api.put('/auth/update-profile', updates);
            if (res && res.success && res.user) {
                // refresh profile and derived lists from server
                await fetchProfile();
                return { success: true, user: res.user };
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
                await updateProfile({ kyNang: newSkills });
                await fetchProfile();
            }
        } catch (err) {
            console.error('Failed to add skill:', err);
        }
    };

    const removeSkill = async (skill) => {
        try {
            const newSkills = skills.filter((s) => s !== skill);
            await updateProfile({ kyNang: newSkills });
            await fetchProfile();
        } catch (err) {
            console.error('Failed to remove skill:', err);
        }
    };

    const addEducation = async (edu) => {
        try {
            const newEdu = [...(education || []), edu];
            await updateProfile({ hocVan: newEdu });
            await fetchProfile();
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
        updateCV,
        refetch: fetchProfile,
        updateProfile
    };
};
