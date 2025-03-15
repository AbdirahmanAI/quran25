import { useState, useCallback } from 'react';
import { Verse } from '@/lib/types';
import { useErrorHandler } from './useErrorHandler';

export function useVerseState(initialVerse: Verse) {
  const [currentVerse, setCurrentVerse] = useState<Verse>(initialVerse);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleError = useErrorHandler();

  const handleVerseChange = useCallback(async (newVerse: Verse) => {
    setIsLoading(true);
    try {
      // Add any additional verse loading logic here
      setCurrentVerse(newVerse);
      setIsPlaying(false);
    } catch (error) {
      handleError(error as Error, 'Failed to load verse');
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  const togglePlayState = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  return {
    currentVerse,
    isPlaying,
    isLoading,
    handleVerseChange,
    togglePlayState,
    setIsPlaying,
  };
} 