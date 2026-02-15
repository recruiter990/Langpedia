export type Language = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  learners?: number;
};

export const languages: Language[] = [
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', learners: 2500 },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', learners: 3200 },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', learners: 2800 },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', learners: 2100 },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', learners: 1500 },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', learners: 1200 },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', learners: 1100 },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', learners: 800 },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', learners: 700 },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', learners: 900 },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', learners: 600 },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', learners: 500 },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', learners: 650 },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', learners: 750 },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', learners: 550 },
];

export const getLanguageByCode = (code: string): Language | undefined => {
  return languages.find(lang => lang.code === code);
};

export const getLanguageCodeForSpeech = (code: string): string => {
  const speechCodes: Record<string, string> = {
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
  return speechCodes[code] || 'en-US';
};

