// ==================== hooks/useProfile.js ====================
import { useState, useEffect } from 'react';

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

            // Mock data - Replace with actual API calls
            // const [profileRes, eduRes, skillsRes] = await Promise.all([
            //   fetch('/api/student/profile'),
            //   fetch('/api/student/education'),
            //   fetch('/api/student/skills')
            // ]);

            await new Promise((resolve) => setTimeout(resolve, 500));

            const mockProfile = {
                name: 'Nguyễn Văn A',
                email: 'nguyenvana@student.edu.vn',
                phone: '0123456789',
                birthDate: '2002-05-15',
                address: 'Hà Nội, Việt Nam',
                major: 'Sinh viên IT',
                avatar: null
            };

            const mockEducation = [
                {
                    id: 1,
                    school: 'Đại học Bách Khoa Hà Nội',
                    major: 'Công nghệ thông tin',
                    period: '2020 - 2024',
                    gpa: '3.5/4.0'
                }
            ];

            const mockSkills = [
                'React',
                'TypeScript',
                'Node.js',
                'TailwindCSS',
                'Git',
                'Figma'
            ];

            setProfile(mockProfile);
            setEducation(mockEducation);
            setSkills(mockSkills);
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
            // const response = await fetch('/api/student/profile/avatar', {
            //   method: 'POST',
            //   body: formData
            // });
            // const data = await response.json();

            // Mock implementation
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prev) => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        } catch (err) {
            console.error('Failed to update avatar:', err);
        }
    };

    const addSkill = async (skill) => {
        try {
            // await fetch('/api/student/skills', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ skill })
            // });

            if (!skills.includes(skill)) {
                setSkills((prev) => [...prev, skill]);
            }
        } catch (err) {
            console.error('Failed to add skill:', err);
        }
    };

    const removeSkill = async (skill) => {
        try {
            // await fetch(`/api/student/skills/${skill}`, {
            //   method: 'DELETE'
            // });

            setSkills((prev) => prev.filter((s) => s !== skill));
        } catch (err) {
            console.error('Failed to remove skill:', err);
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
        refetch: fetchProfile
    };
};
