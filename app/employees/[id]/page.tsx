'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useEmployeeDetail } from '@/modules/employee/hooks/useEmployeeDetail';
import { useEmployeeUpdate } from '@/modules/employee/hooks/useEmployeeUpdate';
import { EmployeeInput } from '@/modules/employee/types';
import { EmployeeForm } from '../components/EmployeeForm';
import Link from 'next/link';

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params.id as string;

  const { employee, isLoading, error, fetchEmployee } = useEmployeeDetail();
  const {
    updateEmployee,
    isLoading: isUpdating,
    error: updateError,
  } = useEmployeeUpdate();

  useEffect(() => {
    if (employeeId) {
      fetchEmployee(employeeId);
    }
  }, [employeeId, fetchEmployee]);

  const handleSubmit = async (data: EmployeeInput) => {
    const result = await updateEmployee(employeeId, data);
    if (result) {
      router.push('/employees');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/employees"
          className="text-indigo-600 hover:text-indigo-700 text-sm mb-4 inline-block"
        >
          ← Back to Employees
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Employee
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Update employee information
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600 dark:text-gray-400">
            Loading employee details...
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Form Container */}
      {!isLoading && employee && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <EmployeeForm
            initialData={employee}
            onSubmit={handleSubmit}
            isLoading={isUpdating}
            error={updateError}
            submitLabel="Update Employee"
          />
        </div>
      )}
    </div>
  );
}
