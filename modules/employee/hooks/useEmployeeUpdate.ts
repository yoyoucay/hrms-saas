'use client';

import { useState } from 'react';
import { employeeApi } from '../api/employeeApi';
import { UpdateEmployeeRequest, Employee } from '../types';

export const useEmployeeUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEmployee = async (
    id: string,
    data: UpdateEmployeeRequest
  ): Promise<Employee | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const employee = await employeeApi.updateEmployee(id, data);
      return employee;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update employee';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateEmployee, isLoading, error };
};
