'use client';

import { useState } from 'react';
import { employeeApi } from '../api/employeeApi';
import { CreateEmployeeRequest, Employee } from '../types';

export const useEmployeeCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEmployee = async (data: CreateEmployeeRequest): Promise<Employee | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const employee = await employeeApi.createEmployee(data);
      return employee;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create employee';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createEmployee, isLoading, error };
};
