// ==================== hooks/useApplications.js ====================
import { useState, useEffect } from 'react';

export const useApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);

            // Mock data - Replace with actual API call
            // const response = await fetch('/api/student/applications');
            // const data = await response.json();

            // Mock delay to simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));

            const mockData = [
                {
                    id: 1,
                    company: 'FPT Software',
                    position: 'Thực tập sinh Frontend Developer',
                    logo: null,
                    submittedDate: '15/01/2024',
                    interviewDate: null,
                    status: 'pending'
                },
                {
                    id: 2,
                    company: 'VNG Corporation',
                    position: 'Thực tập sinh Marketing Digital',
                    logo: null,
                    submittedDate: '12/01/2024',
                    interviewDate: '20/01/2024 14:00',
                    status: 'reviewing'
                },
                {
                    id: 3,
                    company: 'Tiki Corporation',
                    position: 'Thực tập sinh UI/UX Designer',
                    logo: null,
                    submittedDate: '08/01/2024',
                    interviewDate: null,
                    status: 'accepted'
                }
            ];

            setApplications(mockData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const withdrawApplication = async (id) => {
        try {
            // await fetch(`/api/student/applications/${id}/withdraw`, {
            //   method: 'POST'
            // });

            setApplications((prev) => prev.filter((app) => app.id !== id));
        } catch (err) {
            console.error('Failed to withdraw:', err);
        }
    };

    return {
        applications,
        loading,
        error,
        withdrawApplication,
        refetch: fetchApplications
    };
};

