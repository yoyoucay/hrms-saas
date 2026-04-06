'use client';

import { useState, useCallback } from 'react';
import { employeeApi } from '../api/employeeApi';
import { Employee } from '../types';

export const useEmployeeDetail = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployee = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await employeeApi.getEmployeeDetail(id);
      setEmployee(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch employee';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { employee, isLoading, error, fetchEmployee };
};
