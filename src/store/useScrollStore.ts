import { create } from 'zustand';

interface ScrollState {
  currentView: number;
  isAnimating: boolean;
  setCurrentView: (view: number) => void;
  setIsAnimating: (state: boolean) => void;
}

export const useScrollStore = create<ScrollState>()((set) => ({
  currentView: 1,
  isAnimating: false,
  setCurrentView: (view) => set({ currentView: view }),
  setIsAnimating: (state) => set({ isAnimating: state }),
}));
