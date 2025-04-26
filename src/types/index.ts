export interface Game {
  id: string;
  title: string;
  description: string;
  category: 'educational' | 'entertainment';
  subject?: 'math' | 'science' | 'language' | 'general';
  thumbnail: string;
  gameUrl: string;
  rating: number;
  teacherRecommended?: boolean;
  ageRange: {
    min: number;
    max: number;
  };
}

export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  class?: string;
  grade?: number;
}