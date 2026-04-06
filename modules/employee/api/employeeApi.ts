import apiClient from '@/lib/axios-instance';
import {
  EmployeeResponse,
  EmployeesListResponse,
  Employee,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
} from '../types';

// Helper function to normalize backend response to app type
const normalizeEmployee = (data: EmployeeResponse): Employee => ({
  id: data.id,
  empId: data.sEmpID,
  fullName: data.sFullName,
  email: data.sEmail,
  department: data.sDepartment,
  role: data.sRole,
  hireDate: data.sHireDate,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const employeeApi = {
  // List all employees
  listEmployees: async (): Promise<Employee[]> => {
    const response = await apiClient.get<EmployeesListResponse>(
      '/api/v1/employees'
    );
    // Handle both response formats:
    // 1. { data: [...] } - wrapped response
    // 2. [...] - direct array response
    const data = Array.isArray(response.data) ? response.data : response.data.data;
    return data.map(normalizeEmployee);
  },

  // Create new employee
  createEmployee: async (data: CreateEmployeeRequest): Promise<Employee> => {
    const response = await apiClient.post<EmployeeResponse>(
      '/api/v1/employees',
      data
    );
    return normalizeEmployee(response.data);
  },

  // Get employee detail
  getEmployeeDetail: async (id: string): Promise<Employee> => {
    const response = await apiClient.get<EmployeeResponse>(
      `/api/v1/employees/${id}`
    );
    return normalizeEmployee(response.data);
  },

  // Update employee
  updateEmployee: async (
    id: string,
    data: UpdateEmployeeRequest
  ): Promise<Employee> => {
    const response = await apiClient.patch<EmployeeResponse>(
      `/api/v1/employees/${id}`,
      data
    );
    return normalizeEmployee(response.data);
  },

  // Delete (soft delete) employee
  deleteEmployee: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/employees/${id}`);
  },
};
