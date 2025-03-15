import { useCallback } from 'react';
import { useToast } from '@/lib/hooks/use-toast';

export function useErrorHandler() {
  const { toast } = useToast();

  const handleError = useCallback((error: Error, customMessage?: string) => {
    console.error(error);
    
    toast({
      title: "Error",
      description: customMessage || "Something went wrong. Please try again.",
      variant: "destructive",
      duration: 5000,
    });
  }, [toast]);

  return handleError;
} 