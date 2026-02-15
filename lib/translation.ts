// Free MyMemory Translation API
export const translateText = async (
  text: string,
  fromLang: string,
  toLang: string
): Promise<string> => {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData) {
      return data.responseData.translatedText;
    }
    
    throw new Error('Translation failed');
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

// Cache translations in localStorage
export const getCachedTranslation = (
  text: string,
  fromLang: string,
  toLang: string
): string | null => {
  if (typeof window === 'undefined') return null;
  
  const cacheKey = `translation_${fromLang}_${toLang}_${text}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    const { translation, timestamp } = JSON.parse(cached);
    // Cache expires after 7 days
    if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) {
      return translation;
    }
  }
  
  return null;
};

export const setCachedTranslation = (
  text: string,
  fromLang: string,
  toLang: string,
  translation: string
): void => {
  if (typeof window === 'undefined') return;
  
  const cacheKey = `translation_${fromLang}_${toLang}_${text}`;
  localStorage.setItem(cacheKey, JSON.stringify({
    translation,
    timestamp: Date.now(),
  }));
};

