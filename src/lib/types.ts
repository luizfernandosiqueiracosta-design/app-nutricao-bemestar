// Tipos do aplicativo LifeWave

export interface QuizAnswers {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'lose-weight' | 'maintain' | 'gain-muscle' | 'improve-health';
  dietaryPreferences: string[];
  waterIntake: number;
  sleepHours: number;
}

export interface UserProfile extends QuizAnswers {
  dailyCalories: number;
  dailyWater: number;
  createdAt: string;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  date: string;
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  completed: boolean;
}

export interface WaterLog {
  id: string;
  amount: number;
  time: string;
  date: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  features: string[];
  popular?: boolean;
}
