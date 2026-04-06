'use client';

import { EmployeeInput, Employee } from '@/modules/employee/types';
import { useState, useEffect } from 'react';

interface EmployeeFormProps {
  initialData?: Employee;
  onSubmit: (data: EmployeeInput) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  submitLabel?: string;
}

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
];

const roles = ['Admin', 'HR', 'Employee'];

export const EmployeeForm = ({
  initialData,
  onSubmit,
  isLoading = false,
  error = null,
  submitLabel = 'Save',
}: EmployeeFormProps) => {
  const [formData, setFormData] = useState<EmployeeInput>({
    sEmpID: '',
    sFullName: '',
    sEmail: '',
    sDepartment: '',
    sRole: 'Employee',
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        sEmpID: initialData.empId,
        sFullName: initialData.fullName,
        sEmail: initialData.email,
        sDepartment: initialData.department,
        sRole: initialData.role,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValidationError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.sEmpID.trim()) {
      setValidationError('Employee ID is required');
      return false;
    }
    if (!formData.sFullName.trim()) {
      setValidationError('Full Name is required');
      return false;
    }
    if (!formData.sEmail.trim() || !formData.sEmail.includes('@')) {
      setValidationError('Valid email is required');
      return false;
    }
    if (!formData.sDepartment) {
      setValidationError('Department is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (err) {
      setValidationError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(error || validationError) && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-300">
            {error || validationError}
          </p>
        </div>
      )}

      <div>
        <label
          htmlFor="sEmpID"
          className="block text-sm font-medium text-gray-900 dark:text-white mb-1"
        >
          Employee ID *
        </label>
        <input
          type="text"
          id="sEmpID"
          name="sEmpID"
          value={formData.sEmpID}
          onChange={handleChange}
          disabled={isLoading || !!initialData}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
          placeholder="e.g., EMP-001"
        />
      </div>

      {/* Full Name */}
      <div>
        <label
          htmlFor="sFullName"
          className="block text-sm font-medium text-gray-900 dark:text-white mb-1"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="sFullName"
          name="sFullName"
          value={formData.sFullName}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="sEmail"
          className="block text-sm font-medium text-gray-900 dark:text-white mb-1"
        >
          Email *
        </label>
        <input
          type="email"
          id="sEmail"
          name="sEmail"
          value={formData.sEmail}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
          placeholder="john.doe@company.com"
        />
      </div>

      {/* Department */}
      <div>
        <label
          htmlFor="sDepartment"
          className="block text-sm font-medium text-gray-900 dark:text-white mb-1"
        >
          Department *
        </label>
        <select
          id="sDepartment"
          name="sDepartment"
          value={formData.sDepartment}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Role */}
      <div>
        <label
          htmlFor="sRole"
          className="block text-sm font-medium text-gray-900 dark:text-white mb-1"
        >
          Role *
        </label>
        <select
          id="sRole"
          name="sRole"
          value={formData.sRole}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg transition disabled:cursor-not-allowed"
      >
        {isLoading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
};
