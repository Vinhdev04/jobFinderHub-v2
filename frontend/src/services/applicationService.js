import api from './api';

const applicationService = {
    createApplication: async (data) => {
        try {
            const response = await api.post('/applications', data);
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default applicationService;
