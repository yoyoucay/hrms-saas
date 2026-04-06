import { serverAuthClient } from '@/lib/axios-instance';
import { LoginCredentials, LoginResponse, CurrentUserResponse, User } from '../types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<string> => {
    const response = await serverAuthClient.post<LoginResponse>('/api/v1/auth/login', credentials);
    return response.data.accessToken;
  },

  getCurrentUser: async (accessToken: string): Promise<User> => {
    // For this specific call, we use serverAuthClient directly with authorization header
    const response = await serverAuthClient.get<CurrentUserResponse>('/api/v1/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = response.data;
    return {
      id: data.employeeId.toString(),
      empCode: data.empCode,
      name: data.fullName,
      email: data.email,
      department: data.department,
      role: data.role,
      hireDate: data.hireDate,
    };
  },
};