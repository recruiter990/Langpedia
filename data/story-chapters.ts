/**
 * 50 Story-Based Italian Learning Chapters
 * Organized by CEFR Levels: A1 (Beginner) → C2 (Mastery)
 * Each story includes: dialogue, vocabulary, grammar points, cultural notes
 */

export interface StoryChapter {
  id: number;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  description: string;
  estimatedTime: string;
  xpReward: number;
  scenes: StoryScene[];
  vocabularyFocus: string[];
  grammarPoints: string[];
  culturalNotes: string[];
}

export interface StoryScene {
  id: number;
  location: string;
  backgroundImage: string;
  characters: Character[];
  dialogue: DialogueLine[];
  choices?: Choice[];
  learningGoals: string[];
}

export interface Character {
  name: string;
  role: string;
  avatar: string;
  personality: string;
}

export interface DialogueLine {
  character: string;
  italian: string;
  english: string;
  audio?: string;
  emphasis?: string[]; // Words to highlight
  grammar?: string; // Grammar explanation
}

export interface Choice {
  italian: string;
  english: string;
  correct: boolean;
  feedback: string;
  xp: number;
}

export const storyChapters: StoryChapter[] = [
  // ============================================
  // LEVEL A1: ABSOLUTE BEGINNER (Stories 1-10)
  // ============================================
  {
    id: 1,
    level: 'A1',
    title: '🛬 Arrivo a Roma - Arrival in Rome',
    description: 'Your first day in Italy! Learn essential greetings and introductions at the airport.',
    estimatedTime: '10 minutes',
    xpReward: 50,
    vocabularyFocus: ['Buongiorno', 'Ciao', 'Mi chiamo', 'Piacere', 'Come stai?', 'Bene', 'Grazie', 'Per favore'],
    grammarPoints: ['Basic greetings', 'Introduction formula: Mi chiamo + name', 'Formal vs informal (tu/Lei)'],
    culturalNotes: [
      'Italians greet with double cheek kisses among friends',
      'Use "Lei" (formal you) with strangers and elders',
      'Buongiorno until 12-1pm, then Buonasera'
    ],
    scenes: [
      {
        id: 1,
        location: 'Leonardo da Vinci Airport - Arrivals Hall',
        backgroundImage: '/story-images/airport-arrival.jpg',
        characters: [
          {
            name: 'Marco',
            role: 'Friendly Italian local',
            avatar: '👨',
            personality: 'Warm, helpful, speaks slowly for beginners'
          }
        ],
        dialogue: [
          {
            character: 'Marco',
            italian: 'Buongiorno! Benvenuto a Roma!',
            english: 'Good morning! Welcome to Rome!',
            emphasis: ['Buongiorno', 'Benvenuto'],
            grammar: 'Buongiorno = Good morning (used until afternoon)'
          },
          {
            character: 'You',
            italian: 'Buongiorno! Grazie!',
            english: 'Good morning! Thank you!',
            emphasis: ['Grazie']
          },
          {
            character: 'Marco',
            italian: 'Come ti chiami?',
            english: 'What is your name?',
            emphasis: ['Come ti chiami'],
            grammar: '"Come ti chiami?" is informal. Formal: "Come si chiama?"'
          }
        ],
        choices: [
          {
            italian: 'Mi chiamo Alex. Piacere!',
            english: 'My name is Alex. Nice to meet you!',
            correct: true,
            feedback: '✅ Perfetto! You introduced yourself correctly! "Mi chiamo" = My name is',
            xp: 10
          },
          {
            italian: 'Sono americano.',
            english: 'I am American.',
            correct: false,
            feedback: '❌ Not quite! He asked your NAME, not nationality. Try: "Mi chiamo [your name]"',
            xp: 5
          },
          {
            italian: 'Non parlo italiano.',
            english: 'I don\'t speak Italian.',
            correct: false,
            feedback: '❌ Too negative for a first meeting! Let\'s learn: "Mi chiamo Alex"',
            xp: 5
          }
        ],
        learningGoals: [
          'Master greeting "Buongiorno"',
          'Introduce yourself: "Mi chiamo + name"',
          'Respond to "Come ti chiami?"'
        ]
      },
      {
        id: 2,
        location: 'Airport Taxi Stand',
        backgroundImage: '/story-images/taxi-stand.jpg',
        characters: [
          {
            name: 'Marco',
            role: 'Your new Italian friend',
            avatar: '👨',
            personality: 'Helpful guide'
          }
        ],
        dialogue: [
          {
            character: 'Marco',
            italian: 'Come stai?',
            english: 'How are you?',
            emphasis: ['Come stai'],
            grammar: '"Come stai?" = informal. Formal: "Come sta?"'
          }
        ],
        choices: [
          {
            italian: 'Bene, grazie! E tu?',
            english: 'Good, thank you! And you?',
            correct: true,
            feedback: '✅ Perfetto! You mastered the classic response! "E tu?" = And you?',
            xp: 10
          },
          {
            italian: 'Non capisco.',
            english: 'I don\'t understand.',
            correct: false,
            feedback: '❌ He asked how you ARE. Try: "Bene, grazie!"',
            xp: 5
          },
          {
            italian: 'Sì, molto bene!',
            english: 'Yes, very good!',
            correct: false,
            feedback: '⚠️ Close! But "Sì" means yes. Better: "Bene, grazie!"',
            xp: 7
          }
        ],
        learningGoals: [
          'Respond to "Come stai?"',
          'Use "E tu?" to ask back',
          'Express you\'re doing well'
        ]
      }
    ]
  },

  {
    id: 2,
    level: 'A1',
    title: '🏨 In Hotel - Checking In',
    description: 'Check into your hotel and learn numbers, dates, and basic hotel vocabulary.',
    estimatedTime: '12 minutes',
    xpReward: 60,
    vocabularyFocus: ['Una camera', 'Prenotazione', 'Nome', 'Cognome', 'Uno', 'Due', 'Tre', 'Password WiFi'],
    grammarPoints: ['Numbers 1-10', 'Hotel vocabulary', 'Asking questions with "Dove?"'],
    culturalNotes: [
      'Italian hotels require passport for registration',
      'Breakfast (colazione) often included',
      'Tipping not mandatory but appreciated'
    ],
    scenes: [
      {
        id: 1,
        location: 'Hotel Reception Desk',
        backgroundImage: '/story-images/hotel-lobby.jpg',
        characters: [
          {
            name: 'Sofia',
            role: 'Hotel receptionist',
            avatar: '👩',
            personality: 'Professional, patient'
          }
        ],
        dialogue: [
          {
            character: 'Sofia',
            italian: 'Buonasera! Ha una prenotazione?',
            english: 'Good evening! Do you have a reservation?',
            emphasis: ['Buonasera', 'prenotazione'],
            grammar: '"Ha" = formal "you have". "Buonasera" used after 1pm'
          }
        ],
        choices: [
          {
            italian: 'Sì, ho una prenotazione. Mi chiamo Alex.',
            english: 'Yes, I have a reservation. My name is Alex.',
            correct: true,
            feedback: '✅ Eccellente! Perfect hotel check-in response!',
            xp: 15
          },
          {
            italian: 'No, grazie.',
            english: 'No, thank you.',
            correct: false,
            feedback: '❌ Oops! You DO have a reservation. Say: "Sì, ho una prenotazione"',
            xp: 5
          },
          {
            italian: 'Una camera, per favore.',
            english: 'A room, please.',
            correct: false,
            feedback: '⚠️ She asked if you have a RESERVATION first. Answer: "Sì"',
            xp: 8
          }
        ],
        learningGoals: [
          'Use "Buonasera" (good evening)',
          'Confirm reservation: "Sì, ho una prenotazione"',
          'State your name at hotel'
        ]
      }
    ]
  },

  {
    id: 3,
    level: 'A1',
    title: '🍕 Al Ristorante - At the Restaurant',
    description: 'Order your first Italian meal! Learn food vocabulary and restaurant phrases.',
    estimatedTime: '15 minutes',
    xpReward: 70,
    vocabularyFocus: ['Pizza', 'Pasta', 'Acqua', 'Vino', 'Il conto', 'Vorrei', 'Per favore', 'Buono'],
    grammarPoints: ['Ordering food: "Vorrei + food"', 'Definite articles: il/la', 'Numbers for prices'],
    culturalNotes: [
      'Italians eat dinner late (8-10pm)',
      'Bread (pane) and water (acqua) often charged separately',
      'Say "Buon appetito!" before eating',
      'Coffee (caffè) comes AFTER the meal, never during'
    ],
    scenes: [
      {
        id: 1,
        location: 'Traditional Roman Trattoria',
        backgroundImage: '/story-images/trattoria.jpg',
        characters: [
          {
            name: 'Giovanni',
            role: 'Friendly waiter',
            avatar: '👨‍🍳',
            personality: 'Passionate about food'
          }
        ],
        dialogue: [
          {
            character: 'Giovanni',
            italian: 'Buonasera! Cosa desidera?',
            english: 'Good evening! What would you like?',
            emphasis: ['Cosa desidera'],
            grammar: '"Cosa desidera?" = What do you desire/want? (formal)'
          }
        ],
        choices: [
          {
            italian: 'Vorrei una pizza Margherita, per favore.',
            english: 'I would like a Margherita pizza, please.',
            correct: true,
            feedback: '✅ Perfetto! "Vorrei" is the polite way to order. You sound like a local!',
            xp: 15
          },
          {
            italian: 'Una pizza.',
            english: 'A pizza.',
            correct: false,
            feedback: '⚠️ That works, but sounds abrupt. Better: "Vorrei una pizza, per favore"',
            xp: 10
          },
          {
            italian: 'Non ho fame.',
            english: 'I\'m not hungry.',
            correct: false,
            feedback: '❌ You came to a restaurant! Let\'s order: "Vorrei una pizza"',
            xp: 5
          }
        ],
        learningGoals: [
          'Order food: "Vorrei + dish"',
          'Use "per favore" (please)',
          'Understand "Cosa desidera?"'
        ]
      }
    ]
  },

  {
    id: 4,
    level: 'A1',
    title: '🗺️ Chiedere Indicazioni - Asking for Directions',
    description: 'Navigate Rome! Learn direction vocabulary and how to ask for help.',
    estimatedTime: '12 minutes',
    xpReward: 60,
    vocabularyFocus: ['Dove?', 'Destra', 'Sinistra', 'Dritto', 'Vicino', 'Lontano', 'Qui', 'Là'],
    grammarPoints: ['Question words: Dove? (Where?)', 'Prepositions: a, in, da', 'Location expressions'],
    culturalNotes: [
      'Romans love helping tourists with directions',
      'Many streets have no signs - ask locals',
      'Most landmarks within walking distance in centro'
    ],
    scenes: [
      {
        id: 1,
        location: 'Street Corner near Trevi Fountain',
        backgroundImage: '/story-images/roman-street.jpg',
        characters: [
          {
            name: 'Anna',
            role: 'Local woman',
            avatar: '👵',
            personality: 'Sweet grandmother type'
          }
        ],
        dialogue: [
          {
            character: 'You',
            italian: 'Scusi, dov\'è il Colosseo?',
            english: 'Excuse me, where is the Colosseum?',
            emphasis: ['Scusi', 'dov\'è'],
            grammar: '"Scusi" = Excuse me (formal). "Dov\'è?" = Where is?'
          },
          {
            character: 'Anna',
            italian: 'Il Colosseo? È vicino! Vai dritto, poi a destra.',
            english: 'The Colosseum? It\'s nearby! Go straight, then right.',
            emphasis: ['vicino', 'dritto', 'destra'],
            grammar: 'Directions: dritto (straight), destra (right), sinistra (left)'
          }
        ],
        choices: [
          {
            italian: 'Grazie mille! Arrivederci!',
            english: 'Thank you so much! Goodbye!',
            correct: true,
            feedback: '✅ Perfetto! "Grazie mille" = Thanks a lot! Very polite!',
            xp: 15
          },
          {
            italian: 'Dove?',
            english: 'Where?',
            correct: false,
            feedback: '⚠️ She just told you! Better to say: "Grazie!" and follow directions.',
            xp: 7
          },
          {
            italian: 'Non capisco.',
            english: 'I don\'t understand.',
            correct: false,
            feedback: '❌ She said: Go STRAIGHT (dritto), then RIGHT (destra). Try to follow!',
            xp: 5
          }
        ],
        learningGoals: [
          'Ask "Dov\'è?" (Where is?)',
          'Understand directions: dritto, destra, sinistra',
          'Thank people: "Grazie mille!"'
        ]
      }
    ]
  },

  {
    id: 5,
    level: 'A1',
    title: '🛒 Al Mercato - At the Market',
    description: 'Shop at a local market! Learn numbers, food items, and bargaining basics.',
    estimatedTime: '15 minutes',
    xpReward: 70,
    vocabularyFocus: ['Quanto costa?', 'Euro', 'Pomodoro', 'Mela', 'Pane', 'Troppo', 'Un chilo', 'Due etti'],
    grammarPoints: ['Numbers 1-100', 'Quantities: un chilo, due etti', 'Asking prices'],
    culturalNotes: [
      'Markets open early morning (7-8am)',
      'Bargaining acceptable at markets, not shops',
      'Vendors may give you "assaggio" (free taste)'
    ],
    scenes: []
  },

  {
    id: 6,
    level: 'A1',
    title: '☕ Al Bar - At the Coffee Shop',
    description: 'Experience Italian coffee culture! Order like a local.',
    estimatedTime: '10 minutes',
    xpReward: 50,
    vocabularyFocus: ['Caffè', 'Cappuccino', 'Cornetto', 'Zucchero', 'Latte', 'Al banco', 'Da portare via'],
    grammarPoints: ['Coffee vocabulary', 'Ordering at the bar vs table', 'Time expressions'],
    culturalNotes: [
      'Cappuccino only in morning (never after 11am!)',
      'Caffè = espresso (default coffee)',
      'Standing at bar (al banco) cheaper than sitting',
      'Italians drink coffee quickly, in one sip'
    ],
    scenes: []
  },

  {
    id: 7,
    level: 'A1',
    title: '🚇 In Metro - Using Public Transport',
    description: 'Navigate Rome\'s metro system and buy tickets.',
    estimatedTime: '12 minutes',
    xpReward: 60,
    vocabularyFocus: ['Biglietto', 'Metro', 'Autobus', 'Fermata', 'Linea', 'Andata', 'Ritorno', 'Convalida'],
    grammarPoints: ['Transport vocabulary', 'Asking for tickets', 'Reading signs'],
    culturalNotes: [
      'Must validate ticket before boarding',
      'Metro has only 3 lines in Rome',
      'Ticket valid 100 minutes on all transport'
    ],
    scenes: []
  },

  {
    id: 8,
    level: 'A1',
    title: '📱 Comprare una SIM - Buying a SIM Card',
    description: 'Get connected! Buy an Italian SIM card and learn tech vocabulary.',
    estimatedTime: '12 minutes',
    xpReward: 60,
    vocabularyFocus: ['Telefono', 'SIM card', 'Internet', 'Dati', 'Giga', 'Mensile', 'Ricarica', 'Documento'],
    grammarPoints: ['Tech vocabulary', 'Numbers for prices', 'Asking questions'],
    culturalNotes: [
      'Need passport/ID to buy SIM',
      'TIM, Vodafone, WindTre main providers',
      'Tourist SIM available at airports'
    ],
    scenes: []
  },

  {
    id: 9,
    level: 'A1',
    title: '🏛️ Al Museo - At the Museum',
    description: 'Visit the Vatican Museums! Learn about art and culture.',
    estimatedTime: '15 minutes',
    xpReward: 70,
    vocabularyFocus: ['Museo', 'Biglietto', 'Studente', 'Ridotto', 'Guida', 'Cappella Sistina', 'Audioguida', 'Vietato'],
    grammarPoints: ['Museum vocabulary', 'Discounts vocabulary', 'Prohibition signs'],
    culturalNotes: [
      'Book Vatican Museums online (huge lines!)',
      'Modest dress code required',
      'No photos in Sistine Chapel',
      'Many museums closed Mondays'
    ],
    scenes: []
  },

  {
    id: 10,
    level: 'A1',
    title: '🎭 Fare Amicizia - Making Friends',
    description: 'Meet Italian friends! Practice introductions and small talk.',
    estimatedTime: '15 minutes',
    xpReward: 80,
    vocabularyFocus: ['Di dove sei?', 'Quanti anni hai?', 'Che lavoro fai?', 'Mi piace', 'Hobby', 'Famiglia', 'Amici'],
    grammarPoints: ['Personal information questions', 'Expressing likes: Mi piace', 'Numbers for age'],
    culturalNotes: [
      'Italians ask personal questions quickly',
      'Age/job/marital status normal small talk',
      'Expect kisses on cheeks when meeting'
    ],
    scenes: []
  },

  // ============================================
  // LEVEL A2: ELEMENTARY (Stories 11-20)
  // ============================================
  {
    id: 11,
    level: 'A2',
    title: '🏠 Cercare Casa - Apartment Hunting',
    description: 'Find a place to stay longer-term! Learn housing vocabulary.',
    estimatedTime: '18 minutes',
    xpReward: 90,
    vocabularyFocus: ['Appartamento', 'Affitto', 'Camera', 'Bagno', 'Cucina', 'Arredato', 'Spese', 'Contratto'],
    grammarPoints: ['Housing vocabulary', 'Describing rooms', 'Negotiating rent'],
    culturalNotes: [
      'Rental contracts minimum 4 years (4+4)',
      'First month + deposit + agency fee upfront',
      'Unfurnished (non arredato) is common'
    ],
    scenes: []
  },

  {
    id: 12,
    level: 'A2',
    title: '🚗 Noleggiare un\'Auto - Renting a Car',
    description: 'Rent a car for a Tuscany road trip! Learn driving vocabulary.',
    estimatedTime: '15 minutes',
    xpReward: 85,
    vocabularyFocus: ['Auto', 'Noleggio', 'Patente', 'Assicurazione', 'Benzina', 'Diesel', 'Autostrada', 'ZTL'],
    grammarPoints: ['Car rental vocabulary', 'Conditional tense: Vorrei', 'Driving expressions'],
    culturalNotes: [
      'International license required',
      'ZTL zones = restricted traffic (huge fines!)',
      'Autostrada requires toll payment'
    ],
    scenes: []
  },

  {
    id: 13,
    level: 'A2',
    title: '👨‍⚕️ Dal Dottore - At the Doctor',
    description: 'Feeling sick? Learn health vocabulary and symptoms.',
    estimatedTime: '16 minutes',
    xpReward: 90,
    vocabularyFocus: ['Male', 'Testa', 'Stomaco', 'Febbre', 'Tosse', 'Raffreddore', 'Medicina', 'Ricetta'],
    grammarPoints: ['Body parts', 'Describing symptoms: Ho mal di...', 'Health vocabulary'],
    culturalNotes: [
      'Pharmacies (farmacia) very knowledgeable',
      'Green cross sign = pharmacy',
      'EU health card valid in Italy'
    ],
    scenes: []
  },

  {
    id: 14,
    level: 'A2',
    title: '💼 Colloquio di Lavoro - Job Interview',
    description: 'Interview for a job in Italy! Professional Italian vocabulary.',
    estimatedTime: '20 minutes',
    xpReward: 100,
    vocabularyFocus: ['Curriculum', 'Esperienza', 'Laurea', 'Competenze', 'Orario', 'Stipendio', 'Quando posso iniziare?'],
    grammarPoints: ['Professional vocabulary', 'Past tense: Ho lavorato', 'Future tense: Inizierò'],
    culturalNotes: [
      'Bring printed CV to interview',
      'Handshakes are standard greeting',
      'Dress formally for interviews'
    ],
    scenes: []
  },

  {
    id: 15,
    level: 'A2',
    title: '🎉 Una Festa - At a Party',
    description: 'Attend an Italian party! Social Italian and making conversation.',
    estimatedTime: '18 minutes',
    xpReward: 95,
    vocabularyFocus: ['Festa', 'Compleanno', 'Regalo', 'Brindisi', 'Ballare', 'Musica', 'Divertimento', 'Cin cin!'],
    grammarPoints: ['Party vocabulary', 'Making toasts', 'Social expressions'],
    culturalNotes: [
      'Bring wine or dessert to dinner parties',
      '"Cin cin!" when toasting (cheers!)',
      'Parties start and end late'
    ],
    scenes: []
  },

  {
    id: 16,
    level: 'A2',
    title: '🏋️ In Palestra - At the Gym',
    description: 'Join an Italian gym! Fitness and sports vocabulary.',
    estimatedTime: '15 minutes',
    xpReward: 85,
    vocabularyFocus: ['Palestra', 'Allenamento', 'Corsa', 'Pesi', 'Yoga', 'Abbonamento', 'Spogliatoio', 'Doccia'],
    grammarPoints: ['Sports vocabulary', 'Reflexive verbs: allenarsi', 'Frequency expressions'],
    culturalNotes: [
      'Gyms require medical certificate',
      'Dress code strictly enforced',
      'Social atmosphere, people chat a lot'
    ],
    scenes: []
  },

  {
    id: 17,
    level: 'A2',
    title: '🌳 Una Gita - A Day Trip',
    description: 'Day trip to Tivoli! Travel planning and countryside vocabulary.',
    estimatedTime: '17 minutes',
    xpReward: 90,
    vocabularyFocus: ['Gita', 'Campagna', 'Treno', 'Orario', 'Partenza', 'Arrivo', 'Paesaggio', 'Foto'],
    grammarPoints: ['Travel vocabulary', 'Time expressions', 'Future plans'],
    culturalNotes: [
      'Day trips popular on Sundays',
      'Regional trains cheaper than fast trains',
      'Many hill towns near Rome'
    ],
    scenes: []
  },

  {
    id: 18,
    level: 'A2',
    title: '📚 In Biblioteca - At the Library',
    description: 'Study Italian at the library! Academic vocabulary.',
    estimatedTime: '14 minutes',
    xpReward: 80,
    vocabularyFocus: ['Biblioteca', 'Libro', 'Prestito', 'Tessera', 'Silenzio', 'Studiare', 'Esame', 'Corso'],
    grammarPoints: ['Academic vocabulary', 'Library procedures', 'Study expressions'],
    culturalNotes: [
      'Libraries often in historic buildings',
      'Need library card for borrowing',
      'Strict silence rules'
    ],
    scenes: []
  },

  {
    id: 19,
    level: 'A2',
    title: '🍷 Degustazione Vino - Wine Tasting',
    description: 'Visit a Tuscan vineyard! Wine and food pairing vocabulary.',
    estimatedTime: '20 minutes',
    xpReward: 100,
    vocabularyFocus: ['Vino', 'Rosso', 'Bianco', 'Cantina', 'Uva', 'Vendemmia', 'Dolce', 'Secco', 'Corposo'],
    grammarPoints: ['Wine vocabulary', 'Describing taste', 'Adjectives for wine'],
    culturalNotes: [
      'Wine regions: Tuscany, Piedmont, Veneto',
      'DOCG = highest quality designation',
      'Wine with meals is cultural norm'
    ],
    scenes: []
  },

  {
    id: 20,
    level: 'A2',
    title: '💑 Un Appuntamento - A Date',
    description: 'Go on a romantic date in Rome! Dating vocabulary and expressions.',
    estimatedTime: '18 minutes',
    xpReward: 95,
    vocabularyFocus: ['Appuntamento', 'Incontrarsi', 'Ti piace?', 'Sei bellissima', 'Un\'altra volta', 'Mi piaci'],
    grammarPoints: ['Dating vocabulary', 'Compliments', 'Making plans together'],
    culturalNotes: [
      'Dating more formal than US',
      'Men traditionally pay on dates',
      'Romance is taken seriously'
    ],
    scenes: []
  },

  // ============================================
  // LEVEL B1: INTERMEDIATE (Stories 21-30)
  // ============================================
  {
    id: 21,
    level: 'B1',
    title: '🎓 Iscriversi all\'Università - Enrolling in University',
    description: 'Apply to an Italian university! Academic procedures and vocabulary.',
    estimatedTime: '22 minutes',
    xpReward: 120,
    vocabularyFocus: ['Università', 'Facoltà', 'Iscrizione', 'Tasse', 'Crediti', 'Esame', 'Laurea', 'Tesi'],
    grammarPoints: ['Academic Italian', 'Bureaucratic language', 'Complex procedures'],
    culturalNotes: [
      'University very affordable (1000-4000€/year)',
      'Bologna Process credit system',
      'Laurea triennale (3 years) + magistrale (2 years)'
    ],
    scenes: []
  },

  {
    id: 22,
    level: 'B1',
    title: '🏢 In Ufficio - At the Office',
    description: 'First day of work! Business Italian and office culture.',
    estimatedTime: '20 minutes',
    xpReward: 110,
    vocabularyFocus: ['Ufficio', 'Collega', 'Riunione', 'Email', 'Scadenza', 'Progetto', 'Cliente', 'Report'],
    grammarPoints: ['Business vocabulary', 'Formal email writing', 'Workplace expressions'],
    culturalNotes: [
      'Coffee breaks sacred (pause caffè)',
      'Lunch break 1-2 hours long',
      'Formal hierarchies respected'
    ],
    scenes: []
  },

  {
    id: 23,
    level: 'B1',
    title: '🏛️ Questura - Immigration Office',
    description: 'Get your permesso di soggiorno! Bureaucracy and legal Italian.',
    estimatedTime: '25 minutes',
    xpReward: 130,
    vocabularyFocus: ['Permesso di soggiorno', 'Documenti', 'Modulo', 'Visto', 'Questura', 'Appuntamento', 'Kit'],
    grammarPoints: ['Legal vocabulary', 'Formal procedures', 'Document terminology'],
    culturalNotes: [
      'Permesso required for stays >90 days',
      'Process takes 3-6 months',
      'Post office kit required to apply'
    ],
    scenes: []
  },

  {
    id: 24,
    level: 'B1',
    title: '🚑 In Emergenza - Emergency Situation',
    description: 'Handle an emergency! Critical vocabulary for urgent situations.',
    estimatedTime: '18 minutes',
    xpReward: 100,
    vocabularyFocus: ['Emergenza', 'Aiuto', 'Pronto soccorso', 'Ambulanza', 'Incidente', 'Chiamare', '118', 'Polizia'],
    grammarPoints: ['Emergency vocabulary', 'Imperative mood', 'Urgent expressions'],
    culturalNotes: [
      '118 = ambulance, 113 = police, 115 = fire',
      '112 = general emergency number',
      'Pronto soccorso = ER (free with EU card)'
    ],
    scenes: []
  },

  {
    id: 25,
    level: 'B1',
    title: '🏦 In Banca - At the Bank',
    description: 'Open an Italian bank account! Financial vocabulary.',
    estimatedTime: '20 minutes',
    xpReward: 110,
    vocabularyFocus: ['Conto corrente', 'Carta di credito', 'Bonifico', 'Bancomat', 'Saldo', 'Commissione', 'IBAN'],
    grammarPoints: ['Banking vocabulary', 'Financial transactions', 'Formal procedures'],
    culturalNotes: [
      'Need codice fiscale to open account',
      'Many banks charge monthly fees',
      'Online banking widespread'
    ],
    scenes: []
  },

  {
    id: 26,
    level: 'B1',
    title: '📺 Guardare il Telegiornale - Watching the News',
    description: 'Understand Italian news! Current events vocabulary.',
    estimatedTime: '22 minutes',
    xpReward: 120,
    vocabularyFocus: ['Notizie', 'Politica', 'Economia', 'Governo', 'Elezioni', 'Cronaca', 'Meteo', 'Sport'],
    grammarPoints: ['News vocabulary', 'Past tense narration', 'Formal language'],
    culturalNotes: [
      'RAI = state broadcaster',
      'TG1 = main news program (8pm)',
      'Regional news important'
    ],
    scenes: []
  },

  {
    id: 27,
    level: 'B1',
    title: '🎭 A Teatro - At the Theater',
    description: 'Experience Italian theater! Cultural and arts vocabulary.',
    estimatedTime: '20 minutes',
    xpReward: 110,
    vocabularyFocus: ['Teatro', 'Spettacolo', 'Palco', 'Platea', 'Attore', 'Regia', 'Opera', 'Intervallo'],
    grammarPoints: ['Theater vocabulary', 'Cultural expressions', 'Arts terminology'],
    culturalNotes: [
      'Opera very popular in Italy',
      'Dress well for theater',
      'Applause at end of each act'
    ],
    scenes: []
  },

  {
    id: 28,
    level: 'B1',
    title: '🍳 Lezione di Cucina - Cooking Class',
    description: 'Learn to cook Italian! Cooking verbs and recipe vocabulary.',
    estimatedTime: '25 minutes',
    xpReward: 130,
    vocabularyFocus: ['Cucinare', 'Ingredienti', 'Ricetta', 'Tagliare', 'Mescolare', 'Bollire', 'Friggere', 'Infornare'],
    grammarPoints: ['Cooking verbs', 'Imperative for recipes', 'Measurements'],
    culturalNotes: [
      'Cooking classes popular with tourists',
      'Regional cuisines very different',
      'Fresh ingredients essential'
    ],
    scenes: []
  },

  {
    id: 29,
    level: 'B1',
    title: '🏃 Maratona di Roma - Rome Marathon',
    description: 'Train for and run a marathon! Sports and fitness Italian.',
    estimatedTime: '20 minutes',
    xpReward: 110,
    vocabularyFocus: ['Maratona', 'Allenamento', 'Corsa', 'Chilometro', 'Tempo', 'Traguardo', 'Medaglia', 'Energia'],
    grammarPoints: ['Sports vocabulary', 'Time expressions', 'Achievement language'],
    culturalNotes: [
      'Rome Marathon in March/April',
      'Route passes major monuments',
      'Very festive atmosphere'
    ],
    scenes: []
  },

  {
    id: 30,
    level: 'B1',
    title: '🎄 Natale in Italia - Christmas in Italy',
    description: 'Experience Italian Christmas! Holiday traditions and vocabulary.',
    estimatedTime: '22 minutes',
    xpReward: 120,
    vocabularyFocus: ['Natale', 'Presepe', 'Albero', 'Panettone', 'Cenone', 'Befana', 'Regali', 'Famiglia'],
    grammarPoints: ['Holiday vocabulary', 'Traditions description', 'Family expressions'],
    culturalNotes: [
      'Christmas Eve dinner (Cenone) most important',
      'Presepe (nativity) in every home',
      'La Befana brings gifts January 6'
    ],
    scenes: []
  },

  // ============================================
  // LEVEL B2: UPPER-INTERMEDIATE (Stories 31-40)
  // ============================================
  {
    id: 31,
    level: 'B2',
    title: '⚖️ In Tribunale - At the Court',
    description: 'Navigate the legal system! Legal Italian and court procedures.',
    estimatedTime: '25 minutes',
    xpReward: 150,
    vocabularyFocus: ['Tribunale', 'Avvocato', 'Giudice', 'Testimone', 'Processo', 'Sentenza', 'Appello', 'Giuria'],
    grammarPoints: ['Legal terminology', 'Formal proceedings', 'Subjunctive mood'],
    culturalNotes: [
      'Italian legal system based on Roman law',
      'No jury system (judges decide)',
      'Trials can take years'
    ],
    scenes: []
  },

  {
    id: 32,
    level: 'B2',
    title: '📰 Scrivere un Articolo - Writing an Article',
    description: 'Work as a journalist! Media and journalistic Italian.',
    estimatedTime: '28 minutes',
    xpReward: 160,
    vocabularyFocus: ['Giornalismo', 'Articolo', 'Intervista', 'Fonte', 'Notizia', 'Redazione', 'Titolo', 'Cronaca'],
    grammarPoints: ['Journalistic style', 'Formal writing', 'Passive voice'],
    culturalNotes: [
      'Major newspapers: Corriere, Repubblica, Stampa',
      'Strong regional press',
      'Political alignment of media clear'
    ],
    scenes: []
  },

  {
    id: 33,
    level: 'B2',
    title: '🏛️ Dibattito Politico - Political Debate',
    description: 'Discuss Italian politics! Political vocabulary and argumentation.',
    estimatedTime: '30 minutes',
    xpReward: 170,
    vocabularyFocus: ['Politica', 'Parlamento', 'Senato', 'Camera', 'Partito', 'Elezioni', 'Presidente', 'Legge'],
    grammarPoints: ['Political discourse', 'Argumentative language', 'Complex sentence structures'],
    culturalNotes: [
      'Parliamentary republic (no monarch)',
      'President = ceremonial, PM = real power',
      'Frequent government changes'
    ],
    scenes: []
  },

  {
    id: 34,
    level: 'B2',
    title: '🔬 Ricerca Scientifica - Scientific Research',
    description: 'Present scientific research! Academic and technical Italian.',
    estimatedTime: '30 minutes',
    xpReward: 170,
    vocabularyFocus: ['Ricerca', 'Esperimento', 'Ipotesi', 'Dati', 'Risultati', 'Conclusioni', 'Metodologia', 'Pubblicazione'],
    grammarPoints: ['Scientific vocabulary', 'Technical writing', 'Passive constructions'],
    culturalNotes: [
      'Strong scientific tradition',
      'Research often underfunded',
      'Brain drain to abroad common'
    ],
    scenes: []
  },

  {
    id: 35,
    level: 'B2',
    title: '🎨 Critica d\'Arte - Art Criticism',
    description: 'Analyze Italian art! Art history and critical vocabulary.',
    estimatedTime: '28 minutes',
    xpReward: 160,
    vocabularyFocus: ['Arte', 'Pittore', 'Scultura', 'Rinascimento', 'Barocco', 'Prospettiva', 'Composizione', 'Tecnica'],
    grammarPoints: ['Art terminology', 'Descriptive language', 'Historical periods'],
    culturalNotes: [
      'Italy has 60% of world\'s art treasures',
      'Renaissance = pinnacle of Italian art',
      'Every city has art museums'
    ],
    scenes: []
  },

  {
    id: 36,
    level: 'B2',
    title: '💼 Negoziare un Contratto - Negotiating a Contract',
    description: 'Business negotiation! Advanced business Italian.',
    estimatedTime: '30 minutes',
    xpReward: 170,
    vocabularyFocus: ['Contratto', 'Clausola', 'Accordo', 'Negoziare', 'Condizioni', 'Termine', 'Rescissione', 'Firma'],
    grammarPoints: ['Legal business language', 'Conditional sentences', 'Negotiation phrases'],
    culturalNotes: [
      'Business relationships personal',
      'Trust essential before deals',
      'Expect long negotiations'
    ],
    scenes: []
  },

  {
    id: 37,
    level: 'B2',
    title: '🏥 Sistema Sanitario - Healthcare System',
    description: 'Navigate Italian healthcare! Medical and administrative vocabulary.',
    estimatedTime: '26 minutes',
    xpReward: 150,
    vocabularyFocus: ['SSN', 'Medico di base', 'Specialista', 'Ricovero', 'Ospedale', 'Prestazioni', 'Ticket', 'ASL'],
    grammarPoints: ['Healthcare terminology', 'Bureaucratic procedures', 'Medical language'],
    culturalNotes: [
      'Universal healthcare (SSN)',
      'Register with local ASL',
      'Private insurance supplemental'
    ],
    scenes: []
  },

  {
    id: 38,
    level: 'B2',
    title: '📱 Tecnologia e Società - Technology and Society',
    description: 'Discuss tech trends! Modern vocabulary and social issues.',
    estimatedTime: '28 minutes',
    xpReward: 160,
    vocabularyFocus: ['Tecnologia', 'Digitale', 'Innovazione', 'Privacy', 'Social media', 'Intelligenza artificiale', 'Cybersicurezza'],
    grammarPoints: ['Tech vocabulary', 'Abstract concepts', 'Future tenses'],
    culturalNotes: [
      'Italy slower to adopt new tech',
      'Strong privacy concerns',
      'Generational digital divide'
    ],
    scenes: []
  },

  {
    id: 39,
    level: 'B2',
    title: '🌍 Ambiente e Sostenibilità - Environment and Sustainability',
    description: 'Discuss environmental issues! Ecology and activism vocabulary.',
    estimatedTime: '30 minutes',
    xpReward: 170,
    vocabularyFocus: ['Ambiente', 'Sostenibilità', 'Inquinamento', 'Riciclo', 'Energia rinnovabile', 'Cambiamento climatico'],
    grammarPoints: ['Environmental vocabulary', 'Cause-effect language', 'Persuasive discourse'],
    culturalNotes: [
      'Strong environmental movement',
      'Recycling mandatory in cities',
      'Water conservation important'
    ],
    scenes: []
  },

  {
    id: 40,
    level: 'B2',
    title: '📖 Letteratura Italiana - Italian Literature',
    description: 'Analyze Italian literature! Literary vocabulary and criticism.',
    estimatedTime: '32 minutes',
    xpReward: 180,
    vocabularyFocus: ['Letteratura', 'Romanzo', 'Poesia', 'Autore', 'Trama', 'Personaggio', 'Tema', 'Stile'],
    grammarPoints: ['Literary terminology', 'Analytical language', 'Metaphorical expressions'],
    culturalNotes: [
      'Dante = father of Italian language',
      'Strong literary tradition',
      'Regional dialects in literature'
    ],
    scenes: []
  },

  // ============================================
  // LEVEL C1: ADVANCED (Stories 41-45)
  // ============================================
  {
    id: 41,
    level: 'C1',
    title: '🎓 Difendere la Tesi - Defending Your Thesis',
    description: 'PhD defense! Academic Italian at highest level.',
    estimatedTime: '35 minutes',
    xpReward: 200,
    vocabularyFocus: ['Tesi', 'Dottorato', 'Commissione', 'Relatore', 'Dissertazione', 'Argomentazione', 'Bibliografia'],
    grammarPoints: ['Academic discourse', 'Complex argumentation', 'Scholarly language'],
    culturalNotes: [
      'Thesis defense public event',
      'Family and friends attend',
      'Celebration afterward traditional'
    ],
    scenes: []
  },

  {
    id: 42,
    level: 'C1',
    title: '⚖️ Filosofia e Etica - Philosophy and Ethics',
    description: 'Philosophical discussion! Abstract concepts and reasoning.',
    estimatedTime: '38 minutes',
    xpReward: 220,
    vocabularyFocus: ['Filosofia', 'Etica', 'Morale', 'Esistenzialismo', 'Logica', 'Metafisica', 'Epistemologia'],
    grammarPoints: ['Philosophical terminology', 'Abstract reasoning', 'Complex hypotheticals'],
    culturalNotes: [
      'Philosophy important in education',
      'Liceo classico studies philosophy',
      'Public intellectual culture strong'
    ],
    scenes: []
  },

  {
    id: 43,
    level: 'C1',
    title: '🏛️ Storia d\'Italia - Italian History',
    description: 'Deep dive into Italian history! Historical analysis and interpretation.',
    estimatedTime: '40 minutes',
    xpReward: 230,
    vocabularyFocus: ['Risorgimento', 'Unificazione', 'Fascismo', 'Resistenza', 'Repubblica', 'Costituzione', 'Monarchia'],
    grammarPoints: ['Historical narrative', 'Cause-effect analysis', 'Periodization language'],
    culturalNotes: [
      'Unified only in 1861',
      'WWII deeply traumatic',
      'North-South divide historical'
    ],
    scenes: []
  },

  {
    id: 44,
    level: 'C1',
    title: '🎭 Teatro Classico - Classical Theater',
    description: 'Study Italian theater tradition! Literary and dramatic analysis.',
    estimatedTime: '36 minutes',
    xpReward: 210,
    vocabularyFocus: ['Drammaturgia', 'Commedia dell\'arte', 'Tragedia', 'Monologo', 'Messa in scena', 'Interpretazione'],
    grammarPoints: ['Theatrical terminology', 'Literary analysis', 'Performance vocabulary'],
    culturalNotes: [
      'Commedia dell\'arte = improvised comedy',
      'Venice = theater capital',
      'Goldoni = famous playwright'
    ],
    scenes: []
  },

  {
    id: 45,
    level: 'C1',
    title: '💼 Consulenza Strategica - Strategic Consulting',
    description: 'High-level business strategy! Executive Italian and decision-making.',
    estimatedTime: '35 minutes',
    xpReward: 200,
    vocabularyFocus: ['Strategia', 'Consulenza', 'ROI', 'KPI', 'Analisi SWOT', 'Mercato', 'Competitività', 'Crescita'],
    grammarPoints: ['Business jargon', 'Strategic planning language', 'Executive communication'],
    culturalNotes: [
      'Family businesses dominant',
      'Milan = business capital',
      'Fashion/design key industries'
    ],
    scenes: []
  },

  // ============================================
  // LEVEL C2: MASTERY (Stories 46-50)
  // ============================================
  {
    id: 46,
    level: 'C2',
    title: '📺 Condurre un Talk Show - Hosting a Talk Show',
    description: 'Host your own show! Native-level media Italian.',
    estimatedTime: '40 minutes',
    xpReward: 250,
    vocabularyFocus: ['Conduzione', 'Ospite', 'Intervista', 'Pubblico', 'Diretta', 'Sigla', 'Puntata', 'Ascolti'],
    grammarPoints: ['Media language', 'Spontaneous speech', 'Idiomatic expressions'],
    culturalNotes: [
      'Talk shows very popular',
      'Political debates common',
      'Celebrity culture strong'
    ],
    scenes: []
  },

  {
    id: 47,
    level: 'C2',
    title: '⚖️ Arringa in Tribunale - Court Oration',
    description: 'Deliver closing arguments! Legal rhetoric at highest level.',
    estimatedTime: '45 minutes',
    xpReward: 270,
    vocabularyFocus: ['Arringa', 'Retorica', 'Convincere', 'Giuria', 'Prova', 'Testimonianza', 'Assoluzione', 'Condanna'],
    grammarPoints: ['Legal rhetoric', 'Persuasive techniques', 'Formal oratory'],
    culturalNotes: [
      'Italian legal tradition ancient',
      'Rhetoric essential in law',
      'Famous historical trials'
    ],
    scenes: []
  },

  {
    id: 48,
    level: 'C2',
    title: '🎤 Stand-up Comedy - Fare Cabaret',
    description: 'Perform stand-up comedy! Humor, timing, and cultural references.',
    estimatedTime: '42 minutes',
    xpReward: 260,
    vocabularyFocus: ['Cabaret', 'Battuta', 'Comicità', 'Satira', 'Ironia', 'Pubblico', 'Sketch', 'Improvvisazione'],
    grammarPoints: ['Humor language', 'Wordplay', 'Cultural references'],
    culturalNotes: [
      'Italian humor often satirical',
      'Regional humor traditions',
      'Comedy clubs growing'
    ],
    scenes: []
  },

  {
    id: 49,
    level: 'C2',
    title: '🎬 Regia Cinematografica - Film Directing',
    description: 'Direct an Italian film! Cinema vocabulary and artistic vision.',
    estimatedTime: '45 minutes',
    xpReward: 270,
    vocabularyFocus: ['Regia', 'Sceneggiatura', 'Ripresa', 'Montaggio', 'Fotografia', 'Scenografia', 'Colonna sonora'],
    grammarPoints: ['Cinema terminology', 'Artistic vocabulary', 'Creative direction'],
    culturalNotes: [
      'Neorealism = Italian film movement',
      'Fellini, Antonioni = masters',
      'Venice Film Festival prestigious'
    ],
    scenes: []
  },

  {
    id: 50,
    level: 'C2',
    title: '🏛️ Discorso Politico - Political Speech',
    description: 'Deliver a major political speech! Oratory and rhetoric mastery.',
    estimatedTime: '50 minutes',
    xpReward: 300,
    vocabularyFocus: ['Oratoria', 'Retorica', 'Discorso', 'Persuasione', 'Visione', 'Programma', 'Nazione', 'Futuro'],
    grammarPoints: ['Political oratory', 'Rhetorical devices', 'Inspirational language'],
    culturalNotes: [
      'Italian political rhetoric passionate',
      'Piazza speeches traditional',
      'Gestures crucial in speaking'
    ],
    scenes: []
  }
];

// Helper function to get stories by level
export const getStoriesByLevel = (level: string): StoryChapter[] => {
  return storyChapters.filter(chapter => chapter.level === level);
};

// Helper function to get next story
export const getNextStory = (currentId: number): StoryChapter | null => {
  return storyChapters.find(chapter => chapter.id === currentId + 1) || null;
};

// Helper function to check if story is unlocked
export const isStoryUnlocked = (storyId: number, completedStories: number[]): boolean => {
  if (storyId === 1) return true; // First story always unlocked
  return completedStories.includes(storyId - 1); // Previous story must be completed
};
