// ==================== hooks/useInterviews.js ====================
import { useState, useEffect } from 'react';

export const useInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInterviews();
    }, []);

    const fetchInterviews = async () => {
        try {
            setLoading(true);

            // Mock data - Replace with actual API call
            // const response = await fetch('/api/student/interviews');
            // const data = await response.json();

            await new Promise((resolve) => setTimeout(resolve, 500));

            const mockData = [
                {
                    id: 1,
                    company: 'VNG Corporation',
                    position: 'Thực tập sinh Marketing Digital',
                    date: '20/01/2024',
                    time: '14:00',
                    location: 'Google Meet',
                    interviewer: 'Nguyễn Văn A - HR Manager',
                    type: 'online',
                    status: 'online',
                    meetingLink: 'https://meet.google.com/abc-defg-hij'
                },
                {
                    id: 2,
                    company: 'Shopee Vietnam',
                    position: 'Thực tập sinh Data Analyst',
                    date: '22/01/2024',
                    time: '10:00',
                    location: 'Tầng 5, Tòa nhà Viettel, Hà Nội',
                    interviewer: 'Trần Thị B - Team Lead',
                    type: 'offline',
                    status: 'offline',
                    meetingLink: null
                }
            ];

            setInterviews(mockData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const joinInterview = (id) => {
        const interview = interviews.find((i) => i.id === id);
        if (interview?.meetingLink) {
            window.open(interview.meetingLink, '_blank');
        } else {
            alert('Link phỏng vấn không khả dụng');
        }
    };

    return {
        interviews,
        loading,
        error,
        joinInterview,
        refetch: fetchInterviews
    };
};
