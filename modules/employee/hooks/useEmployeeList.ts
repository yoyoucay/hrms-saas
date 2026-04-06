'use client';

import { useState, useCallback } from 'react';
import { employeeApi } from '../api/employeeApi';
import { Employee } from '../types';

export const useEmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await employeeApi.listEmployees();
      setEmployees(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch employees';
      console.log('Error fetching employees:', message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { employees, isLoading, error, fetchEmployees };
};
