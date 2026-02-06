export type ScreenName = 
  | 'onboarding' 
  | 'home' 
  | 'create_story' 
  | 'reader' 
  | 'library' 
  | 'achievements' 
  | 'parental_settings'
  | 'settings'
  | 'subscription';

export interface Story {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  coverUrl: string;
  theme: string;
  isLocked?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Material symbol name
  colorClass: string;
  isLocked: boolean;
}

export enum CreateStep {
  THEME = 1,
  TONE = 2,
  DURATION = 3,
  GENERATING = 4,
  RESULT = 5
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  features: string[];
  isPopular?: boolean;
  color: string;
  buttonText: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}