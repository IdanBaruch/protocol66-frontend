// API Types for Protocol 66
export interface User {
  id: string;
  phone: string;
  email?: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'clinician';
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  scheduledTimes: string[];
  isActive: boolean;
  takenToday?: boolean;
  lastTaken?: string;
}

export interface MedicationLog {
  id: string;
  status: 'verified' | 'pending' | 'failed';
  confidence: number;
  streakCount: number;
  takenAt: string;
  imageUrl?: string;
}

export enum MoodLevel {
  VERY_LOW = 'very_low',
  LOW = 'low',
  NEUTRAL = 'neutral',
  GOOD = 'good',
  VERY_GOOD = 'very_good',
}

export interface MoodLog {
  id: string;
  mood: MoodLevel;
  energy?: string;
  anxietyLevel?: number;
  sleepQuality?: number;
  notes?: string;
  createdAt: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
