export interface Meal {
  id: string;
  userId: string;
  name: string;
  calories: number;
  date: Date;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  userId: string;
  name: string;
  duration: number;
  calories: number;
  date: Date;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Water {
  id: string;
  userId: string;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MealFormData {
  id?: string;
  name: string;
  calories: number;
  date: string;
  notes?: string;
}

export interface ExerciseFormData {
  id?: string;
  name: string;
  duration: number;
  calories: number;
  date: string;
  notes?: string;
}

export interface WaterFormData {
  id?: string;
  amount: number;
  date: string;
}
