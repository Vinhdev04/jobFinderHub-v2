import api from './api';

const applicationService = {
    createApplication: async (data, isFormData = false) => {
        try {
            const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
            const response = isFormData ? await api.postForm('/applications', data, config) : await api.post('/applications', data, config);
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default applicationService;
