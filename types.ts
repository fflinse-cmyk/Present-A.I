
export interface QuizState {
  recipient: string; // Step 1
  intent: string; // Step 2 (Impress/Surprise)
  gender: string; // Step 3 (Mapped from Relationship context)
  ageGroup: string; // Step 4
  style: string; // Step 5
  difficulty: string; // Step 6
  hasEverything: string; // Step 7
  preference: string; // Step 8 (Trad vs Different)
  budget: string; // Step 9
  format: string; // Step 10
  vibe: string; // Step 11 (Feeling)
  fear: string; // Step 12
  riskLevel: string; // Step 13
  utilityVsEmotion: string; // Step 14
}

export interface GiftSuggestion {
  name: string;
  description: string;
  estimatedPrice: string;
  reason: string; // Why it matches the profile
  category: 'Perfect Match' | 'Creative' | 'DIY' | 'Premium';
}

export interface AIResponse {
  suggestions: GiftSuggestion[];
  analysis: string; // Short analysis of the profile
}

export type StepProps = {
  onNext: () => void;
  onUpdate: (field: keyof QuizState, value: string) => void;
  data: QuizState;
};
