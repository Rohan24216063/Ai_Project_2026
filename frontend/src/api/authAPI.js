import apiClient from './apiClient';

export const authAPI = {
  // Student রেজিস্ট্রেশন
  registerStudent: async (studentData) => {
    const response = await apiClient.post('/auth/register/student', {
      email: studentData.email,
      password: studentData.password,
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      phone: studentData.phone,
      department: studentData.department,
      studentId: studentData.studentId,
    });
    return response.data;
  },

  // Login (সব রোলের জন্য)
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  },

  // Current user info পেতে
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
