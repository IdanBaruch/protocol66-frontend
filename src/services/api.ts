import axios from 'axios';
import type { AuthResponse, Medication, MedicationLog, MoodLog, MoodLevel } from '@/types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  sendMagicLink: (phone: string, email?: string) =>
    api.post('/api/v1/auth/send-magic-link', { phone, email }),

  verifyToken: (token: string) =>
    api.post<AuthResponse>('/api/v1/auth/verify-token', { token }),
};

// Medication APIs
export const medicationAPI = {
  getDailyPlan: () =>
    api.get<Medication[]>('/api/v1/meds/daily-plan'),

  verifyIntake: (medicationId: string, image: File, location?: { latitude: number; longitude: number }) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('medicationId', medicationId);
    if (location) {
      formData.append('latitude', location.latitude.toString());
      formData.append('longitude', location.longitude.toString());
    }
    return api.post<MedicationLog>('/api/v1/meds/verify-intake', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getHistory: (days?: number) =>
    api.get<MedicationLog[]>('/api/v1/meds/history', { params: { days } }),
};

// Mood APIs
export const moodAPI = {
  checkIn: (data: {
    mood: MoodLevel;
    energy?: string;
    anxietyLevel?: number;
    sleepQuality?: number;
    notes?: string;
  }) => api.post('/api/v1/mood/check-in', data),

  getHistory: (days?: number) =>
    api.get<MoodLog[]>('/api/v1/mood/history', { params: { days } }),

  getLatest: () =>
    api.get<MoodLog>('/api/v1/mood/latest'),
};

// User APIs
export const userAPI = {
  getProfile: () =>
    api.get('/api/v1/users/me'),

  updateProfile: (data: Partial<{ firstName: string; lastName: string }>) =>
    api.put('/api/v1/users/me', data),
};

export default api;
