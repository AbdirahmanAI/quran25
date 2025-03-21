'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PenTool, Book } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Verse } from '@/lib/types';
import AudioPlayer from '@/components/quran/audio-player';
import BookmarkButton from '@/components/quran/bookmark-button';
import { useVerseState } from '@/hooks/useVerseState';

interface VerseCardProps {
  verse: Verse;
  chapterNumber: number;
  totalVerses: number;
  isPlaying: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onVerseComplete?: () => void;
  onNextVerse?: () => void;
}

const VerseCard = memo(function VerseCard({
  verse,
  chapterNumber,
  totalVerses,
  isPlaying,
  onPlayStateChange,
  onVerseComplete,
  onNextVerse
}: VerseCardProps) {
  const {
    isLoading,
    handleVerseChange,
  } = useVerseState(verse);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "transform transition-all duration-300",
        isPlaying && "scale-[1.02]"
      )}
    >
      <Card 
        className={cn(
          "overflow-hidden islamic-border",
          "bg-gradient-to-br from-background to-accent/5",
          isPlaying && "ring-2 ring-primary"
        )}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" aria-label={`Verse ${chapterNumber}:${verse.number}`}>
                {chapterNumber}:{verse.number}
              </Badge>
              {verse.juzNumber && (
                <Badge variant="secondary" aria-label={`Juz ${verse.juzNumber}`}>
                  Juz {verse.juzNumber}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <AudioPlayer
                chapterNumber={chapterNumber}
                verseNumber={verse.number}
                totalVerses={totalVerses}
                onPlayStateChange={onPlayStateChange}
                onVerseComplete={onVerseComplete}
              />
              <BookmarkButton
                chapterId={chapterNumber}
                verseNumber={verse.number}
                title={`${chapterNumber}:${verse.number}`}
              />
              <Button
                variant="outline"
                size="sm"
                aria-label="Study verse"
                onClick={() => {/* Add study mode handler */}}
              >
                <PenTool className="h-4 w-4 mr-2" />
                Study
              </Button>
              <Button
                variant="outline"
                size="sm"
                aria-label="Analyze verse"
                onClick={() => {/* Add analysis handler */}}
              >
                <Book className="h-4 w-4 mr-2" />
                Analysis
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div 
              dir="rtl" 
              className="arabic-text text-right"
              lang="ar"
              aria-label="Arabic verse text"
            >
              {verse.text}
            </div>
            <div 
              className="translation-text text-muted-foreground border-t pt-4"
              lang="en"
              aria-label="English translation"
            >
              {verse.translation}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default VerseCard;