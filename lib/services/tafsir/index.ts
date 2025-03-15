import { getTafsirContent } from './api/tafsir';
import { getVerseDetails } from './api/verse';
import { TafsirCache } from './cache';
import { formatTafsirContent } from './utils/formatter';
import { TafsirError } from './errors';
import { TafsirContent, TafsirEdition } from './types';
import { TAFSIR_EDITIONS } from './config';

export async function getTafsir(
  chapterNumber: number,
  verseNumber: number,
  tafsirId: number
): Promise<TafsirContent> {
  const verseKey = `${chapterNumber}:${verseNumber}`;

  try {
    // Check cache first
    const cached = await TafsirCache.get(verseKey, tafsirId);
    if (cached) {
      return formatTafsirContent({
        text: cached.text,
        verseText: cached.verse.text,
        verseTranslation: cached.verse.translation,
        tafsirId: cached.edition.id,
        verse: {
          key: verseKey,
          chapter: chapterNumber,
          number: verseNumber
        }
      });
    }

    // Fetch verse details and tafsir content in parallel
    const [verseDetails, tafsirContent] = await Promise.all([
      getVerseDetails(verseKey),
      getTafsirContent(verseKey, tafsirId)
    ]);

    const content = formatTafsirContent({
      text: tafsirContent.data.text,
      verseText: verseDetails.text_uthmani,
      verseTranslation: verseDetails.translations[0]?.text || '',
      tafsirId,
      verse: {
        key: verseKey,
        chapter: chapterNumber,
        number: verseNumber
      }
    });

    // Cache the result
    await TafsirCache.set(verseKey, tafsirId, {
      text: tafsirContent.data.text,
      edition: TAFSIR_EDITIONS.find(e => e.id === tafsirId)!,
      verse: {
        key: verseKey,
        text: verseDetails.text_uthmani,
        translation: verseDetails.translations[0]?.text || '',
        number: verseNumber,
        chapter: chapterNumber
      }
    });
    
    return content;

  } catch (error) {
    console.error('Error fetching tafsir:', error);
    
    if (error instanceof TafsirError) {
      throw error;
    }

    throw new TafsirError(
      'An unexpected error occurred',
      'UNKNOWN_ERROR',
      500
    );
  }
}

export { TAFSIR_EDITIONS };
export type { TafsirContent, TafsirEdition };