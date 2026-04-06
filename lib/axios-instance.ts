import axios from 'axios';
import { getSession } from 'next-auth/react';

// For client-side requests (uses Next.js rewrites)
const apiClient = axios.create({
  baseURL: '', // empty means relative to current origin (localhost:3001)
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  console.log('Session in interceptor:', session);
  const token = (session as any)?.apiToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// For server-side requests (direct backend call)
export const serverAuthClient = axios.create({
  baseURL: 'http://localhost:3000', // Direct backend URL for server-side calls
  headers: { 'Content-Type': 'application/json' },
});

export default apiClient;