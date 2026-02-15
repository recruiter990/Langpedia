export const languageCodes: Record<string, string> = {
  en: 'en-US',
  it: 'it-IT',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  pt: 'pt-PT',
  nl: 'nl-NL',
  pl: 'pl-PL',
  ro: 'ro-RO',
  cs: 'cs-CZ',
  sv: 'sv-SE',
  el: 'el-GR',
  hu: 'hu-HU',
  da: 'da-DK',
  no: 'no-NO',
  fi: 'fi-FI',
};

export const speak = (text: string, languageCode: string): void => {
  if (typeof window === 'undefined') return;
  
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageCode;
    utterance.rate = 0.85; // Slightly slower for learning
    utterance.pitch = 1;
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
  }
};

export const stopSpeaking = (): void => {
  if (typeof window === 'undefined') return;
  
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

