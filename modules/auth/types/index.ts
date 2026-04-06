// Response from /auth/login
export interface LoginResponse {
  accessToken: string;
}

// Response from /auth/me
export interface CurrentUserResponse {
  accountId: number;
  employeeId: number;
  empCode: string;
  fullName: string;
  email: string;
  department: string;
  role: 'Admin' | 'HR' | 'Employee';
  hireDate: string;
}

// Normalized user for our application
export interface User {
  id: string;           // employeeId as string
  empCode: string;
  name: string;
  email: string;
  department: string;
  role: 'Admin' | 'HR' | 'Employee';
  hireDate: string;
}

export interface LoginCredentials {
  empCode: string;
  password: string;
}