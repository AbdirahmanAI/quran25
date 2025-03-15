import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VerseCard from '../verse-card';
import { ThemeProvider } from 'next-themes';
import { Verse } from '@/lib/types';

// Mock the framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock the audio player component
jest.mock('@/components/quran/audio-player', () => {
  return function MockAudioPlayer() {
    return <div data-testid="audio-player">Audio Player</div>;
  };
});

// Mock the bookmark button component
jest.mock('@/components/quran/bookmark-button', () => {
  return function MockBookmarkButton() {
    return <div data-testid="bookmark-button">Bookmark</div>;
  };
});

const mockVerse: Verse = {
  number: 1,
  text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
  juzNumber: 1,
  audio: 'https://example.com/audio.mp3',
  audioTimestamp: 0,
  audioEndTimestamp: 5,
  verseKey: '1:1',
};

describe('VerseCard', () => {
  const renderVerseCard = (props = {}) => {
    return render(
      <ThemeProvider>
        <VerseCard
          verse={mockVerse}
          chapterNumber={1}
          totalVerses={7}
          isPlaying={false}
          {...props}
        />
      </ThemeProvider>
    );
  };

  it('renders verse text and translation', () => {
    renderVerseCard();
    
    expect(screen.getByText(mockVerse.text)).toBeInTheDocument();
    expect(screen.getByText(mockVerse.translation)).toBeInTheDocument();
  });

  it('displays correct verse number', () => {
    renderVerseCard();
    
    expect(screen.getByText('1:1')).toBeInTheDocument();
  });

  it('shows juz number when provided', () => {
    renderVerseCard();
    
    expect(screen.getByText('Juz 1')).toBeInTheDocument();
  });

  it('renders audio player and bookmark button', () => {
    renderVerseCard();
    
    expect(screen.getByTestId('audio-player')).toBeInTheDocument();
    expect(screen.getByTestId('bookmark-button')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderVerseCard();
    
    expect(screen.getByLabelText('Arabic verse text')).toBeInTheDocument();
    expect(screen.getByLabelText('English translation')).toBeInTheDocument();
    expect(screen.getByLabelText('Verse 1:1')).toBeInTheDocument();
  });
}); 