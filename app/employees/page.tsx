'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useEmployeeList } from '@/modules/employee/hooks/useEmployeeList';
import { useEmployeeDelete } from '@/modules/employee/hooks/useEmployeeDelete';
import { Employee } from '@/modules/employee/types';
import { EmployeeTable } from './components/EmployeeTable';
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog';

export default function EmployeesListPage() {
  const { employees, isLoading, error, fetchEmployees } = useEmployeeList();
  const { deleteEmployee, isLoading: isDeleting } = useEmployeeDelete();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDeleteConfirm = async () => {
    if (!selectedEmployee) return;

    const success = await deleteEmployee(selectedEmployee.id);
    if (success) {
      setSelectedEmployee(null);
      fetchEmployees(); // Refresh list
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Employees
        </h1>
        <Link
          href="/employees/create"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          + New Employee
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <EmployeeTable
          employees={employees}
          onDeleteClick={setSelectedEmployee}
          isLoading={isLoading}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        employee={selectedEmployee}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setSelectedEmployee(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
