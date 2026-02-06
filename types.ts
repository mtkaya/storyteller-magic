export type ScreenName =
  | 'onboarding'
  | 'home'
  | 'create_story'
  | 'reader'
  | 'library'
  | 'achievements'
  | 'parental_settings'
  | 'settings'
  | 'subscription'
  | 'stats';

export interface Story {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  coverUrl: string;
  theme: string;
  isLocked?: boolean;
  // Story content
  content?: string[];  // Array of paragraphs (for linear stories)
  character?: string;  // Main character name
  moral?: string;      // Lesson/moral of the story
  ageRange?: string;   // e.g., "3-6", "5-8"
  // Interactive story content
  isInteractive?: boolean;  // Flag for choose-your-own-adventure style
  branches?: StoryBranch[]; // Branching story paths
  startBranchId?: string;   // Starting branch ID
}

// Interactive story choice
export interface StoryChoice {
  id: string;
  text: string;           // Choice button text
  emoji?: string;         // Optional emoji for the choice
  nextBranchId: string;   // Which branch this leads to
  consequence?: string;   // Brief hint about what happens
}

// Story branch/section
export interface StoryBranch {
  id: string;
  paragraphs: string[];   // Content paragraphs for this branch
  choices?: StoryChoice[]; // Choices at the end of this branch
  isEnding?: boolean;     // Is this an ending?
  endingType?: 'happy' | 'neutral' | 'lesson' | 'adventure'; // Type of ending
  endingTitle?: string;   // Custom ending title
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