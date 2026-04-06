'use client';

import { useState } from 'react';
import { employeeApi } from '../api/employeeApi';

export const useEmployeeDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteEmployee = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await employeeApi.deleteEmployee(id);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete employee';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteEmployee, isLoading, error };
};
