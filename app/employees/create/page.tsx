'use client';

import { useRouter } from 'next/navigation';
import { useEmployeeCreate } from '@/modules/employee/hooks/useEmployeeCreate';
import { EmployeeInput } from '@/modules/employee/types';
import { EmployeeForm } from '../components/EmployeeForm';
import Link from 'next/link';

export default function CreateEmployeePage() {
  const router = useRouter();
  const { createEmployee, isLoading, error } = useEmployeeCreate();

  const handleSubmit = async (data: EmployeeInput) => {
    const result = await createEmployee(data);
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
          Create New Employee
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Add a new employee to your organization
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <EmployeeForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          submitLabel="Create Employee"
        />
      </div>
    </div>
  );
}
