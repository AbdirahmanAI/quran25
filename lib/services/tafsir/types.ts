export interface TafsirEdition {
  id: number;
  name: string;
  author: string;
  language: string;
  direction: 'ltr' | 'rtl';
}

export interface TafsirContent {
  text: string;
  edition: TafsirEdition;
  verse: {
    key: string;
    text: string;
    translation: string;
    number: number;
    chapter: number;
  };
}

export interface TafsirResponse {
  code: number;
  status: string;
  data: {
    text: string;
    edition: {
      identifier: string;
      language: string;
      name: string;
      englishName: string;
      direction: string;
    };
    sura: number;
    aya: number;
  };
}

export interface TafsirError {
  code: string;
  message: string;
  status?: number;
}

export interface VerseResponse {
  verse_key: string;
  text_uthmani: string;
  translations: Array<{
    text: string;
    resource_id: number;
  }>;
}

export interface Tafsir {
  text: string;
  edition: TafsirEdition;
  verse: {
    key: string;
    text: string;
    translation: string;
    number: number;
    chapter: number;
  };
}