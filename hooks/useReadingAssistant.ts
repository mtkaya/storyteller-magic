import { useState, useEffect, useCallback, useRef } from 'react';

interface UseReadingAssistantOptions {
  totalWords: number;
  isEnabled: boolean;
  autoSpeed?: number; // milliseconds per word
}

interface UseReadingAssistantReturn {
  activeWordIndex: number;
  nextWord: () => void;
  prevWord: () => void;
  reset: () => void;
  isAuto: boolean;
  toggleAuto: () => void;
  setAutoSpeed: (speed: number) => void;
}

export const useReadingAssistant = ({
  totalWords,
  isEnabled,
  autoSpeed = 300,
}: UseReadingAssistantOptions): UseReadingAssistantReturn => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const [speed, setSpeed] = useState(autoSpeed);
  const timerRef = useRef<number | null>(null);

  const nextWord = useCallback(() => {
    setActiveWordIndex((prev) => (prev < totalWords - 1 ? prev + 1 : prev));
  }, [totalWords]);

  const prevWord = useCallback(() => {
    setActiveWordIndex((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const reset = useCallback(() => {
    setActiveWordIndex(0);
    setIsAuto(false);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const toggleAuto = useCallback(() => {
    setIsAuto((prev) => !prev);
  }, []);

  const setAutoSpeed = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  // Auto mode timer
  useEffect(() => {
    if (!isEnabled || !isAuto) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setActiveWordIndex((prev) => {
        if (prev >= totalWords - 1) {
          setIsAuto(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isEnabled, isAuto, speed, totalWords]);

  // Reset when total words changes (new paragraph)
  useEffect(() => {
    reset();
  }, [totalWords, reset]);

  return {
    activeWordIndex,
    nextWord,
    prevWord,
    reset,
    isAuto,
    toggleAuto,
    setAutoSpeed,
  };
};
