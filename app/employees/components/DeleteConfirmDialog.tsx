'use client';

import { Employee } from '@/modules/employee/types';

interface DeleteConfirmDialogProps {
  employee: Employee | null;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DeleteConfirmDialog = ({
  employee,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmDialogProps) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Delete Employee
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete{' '}
          <strong>{employee.fullName}</strong> ({employee.empId})? This action
          cannot be undone.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition disabled:cursor-not-allowed"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
