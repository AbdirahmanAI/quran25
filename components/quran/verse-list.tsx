'use client';

import { useState, useEffect, Suspense } from 'react';
import { Verse } from '@/lib/types';
import VerseCard from './verse-card';
import { useAudioSettings } from '@/lib/audio-context';
import { audioService } from '@/lib/services/audio-service';
import { getAudioUrl } from '@/lib/services/audio';
import { Loader2 } from 'lucide-react';

interface VerseListProps {
  verses: Verse[];
  chapterNumber: number;
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
        <p className="text-sm text-muted-foreground">Loading verses...</p>
      </div>
    </div>
  );
}

function VerseListContent({ verses, chapterNumber }: VerseListProps) {
  const [playingVerseNumber, setPlayingVerseNumber] = useState<number | null>(null);
  const { globalSettings } = useAudioSettings();

  useEffect(() => {
    return () => {
      audioService.stop();
    };
  }, []);

  const handlePlayStateChange = (verseNumber: number, isPlaying: boolean) => {
    setPlayingVerseNumber(isPlaying ? verseNumber : null);
  };

  const handleVerseComplete = (currentVerseNumber: number) => {
    const nextVerseNumber = currentVerseNumber + 1;
    if (nextVerseNumber <= verses.length) {
      if (globalSettings.autoPlay) {
        const nextVerse = verses[nextVerseNumber - 1];
        const audioUrl = getAudioUrl(chapterNumber, nextVerse.number, globalSettings.reciter);
        audioService.playVerse(`${chapterNumber}:${nextVerse.number}`, audioUrl)
          .catch(console.error);
        setPlayingVerseNumber(nextVerseNumber);
      } else {
        setPlayingVerseNumber(null);
      }
    } else {
      setPlayingVerseNumber(null);
    }
  };

  return (
    <div className="space-y-4">
      {verses.map((verse) => (
        <VerseCard
          key={verse.number}
          verse={verse}
          chapterNumber={chapterNumber}
          totalVerses={verses.length}
          isPlaying={playingVerseNumber === verse.number}
          onPlayStateChange={(isPlaying) => handlePlayStateChange(verse.number, isPlaying)}
          onVerseComplete={() => handleVerseComplete(verse.number)}
        />
      ))}
    </div>
  );
}

export default function VerseList(props: VerseListProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerseListContent {...props} />
    </Suspense>
  );
}