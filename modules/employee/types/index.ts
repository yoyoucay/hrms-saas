// Backend response types (snake_case)
export interface EmployeeResponse {
  id: string;
  sEmpID: string;
  sFullName: string;
  sEmail: string;
  sDepartment: string;
  sRole: 'Admin' | 'HR' | 'Employee';
  sHireDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeesListResponse {
  data: EmployeeResponse[];
  totalCount?: number;
  page?: number;
  pageSize?: number;
}

// Normalized app types (camelCase)
export interface Employee {
  id: string;
  empId: string;
  fullName: string;
  email: string;
  department: string;
  role: 'Admin' | 'HR' | 'Employee';
  hireDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Form input types
export interface EmployeeInput {
  sEmpID: string;
  sFullName: string;
  sEmail: string;
  sDepartment: string;
  sRole: 'Admin' | 'HR' | 'Employee';
}

export interface CreateEmployeeRequest extends EmployeeInput {}
export interface UpdateEmployeeRequest extends EmployeeInput {}
