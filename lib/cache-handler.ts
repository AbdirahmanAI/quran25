import { Verse } from '@/lib/types';

interface CacheOptions {
  maxSize?: number;
  expirationTime?: number; // in milliseconds
}

class VerseCache {
  private cache: Map<string, { verse: Verse; timestamp: number }>;
  private maxSize: number;
  private expirationTime: number;

  constructor(options: CacheOptions = {}) {
    this.cache = new Map();
    this.maxSize = options.maxSize || 1000;
    this.expirationTime = options.expirationTime || 1000 * 60 * 60; // 1 hour default
  }

  private getKey(chapterNumber: number, verseNumber: number): string {
    return `${chapterNumber}:${verseNumber}`;
  }

  get(chapterNumber: number, verseNumber: number): Verse | undefined {
    const key = this.getKey(chapterNumber, verseNumber);
    const item = this.cache.get(key);

    if (!item) return undefined;

    const now = Date.now();
    if (now - item.timestamp > this.expirationTime) {
      this.cache.delete(key);
      return undefined;
    }

    return item.verse;
  }

  set(chapterNumber: number, verseNumber: number, verse: Verse): void {
    const key = this.getKey(chapterNumber, verseNumber);
    
    // If cache is full, remove oldest entry
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, { verse, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  remove(chapterNumber: number, verseNumber: number): void {
    const key = this.getKey(chapterNumber, verseNumber);
    this.cache.delete(key);
  }

  size(): number {
    return this.cache.size;
  }
}

// Export a singleton instance
export const verseCache = new VerseCache({
  maxSize: 500, // Adjust based on your needs
  expirationTime: 1000 * 60 * 30, // 30 minutes
}); 