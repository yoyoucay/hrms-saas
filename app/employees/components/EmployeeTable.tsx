'use client';

import { Employee } from '@/modules/employee/types';
import Link from 'next/link';

interface EmployeeTableProps {
  employees: Employee[];
  onDeleteClick: (employee: Employee) => void;
  isLoading?: boolean;
}

export const EmployeeTable = ({
  employees,
  onDeleteClick,
  isLoading = false,
}: EmployeeTableProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-gray-400">Loading employees...</div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No employees found
          </p>
          <Link
            href="/employees/create"
            className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            Add First Employee
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Employee ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Department
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Role
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {employees.length > 0 && employees.map((employee) => (
            <tr
              key={employee.empId}
              className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition"
            >
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                {employee.empId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                {employee.fullName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {employee.email}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {employee.department}
              </td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    employee.role === 'Admin'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                      : employee.role === 'HR'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300'
                  }`}
                >
                  {employee.role}
                </span>
              </td>
              <td className="px-6 py-4 text-sm space-x-2">
                <Link
                  href={`/employees/${employee.id}`}
                  className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 rounded transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDeleteClick(employee)}
                  className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 rounded transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
