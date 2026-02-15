'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Send, RotateCcw, Trophy, MessageCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  italian?: string;
  translation?: string;
  grammar?: string;
  feedback?: 'correct' | 'needs_improvement' | 'excellent';
}

interface ConversationStats {
  messagesExchanged: number;
  correctResponses: number;
  wordsLearned: string[];
  grammarPoints: string[];
  sessionDuration: number;
}

export function AIConversationAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scenario, setScenario] = useState<string>('cafe');
  const [level, setLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('A1');
  const [isListening, setIsListening] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [stats, setStats] = useState<ConversationStats>({
    messagesExchanged: 0,
    correctResponses: 0,
    wordsLearned: [],
    grammarPoints: [],
    sessionDuration: 0
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionStartRef = useRef<number>(Date.now());

  // Scenario configurations
  const scenarios = {
    cafe: {
      name: '☕ Al Bar - At the Coffee Shop',
      description: 'Order coffee and pastries like a local',
      aiPersona: 'Marco, a friendly Italian barista',
      startingMessage: 'Buongiorno! Cosa desidera oggi?',
      vocabulary: ['caffè', 'cappuccino', 'cornetto', 'zucchero', 'latte macchiato']
    },
    restaurant: {
      name: '🍝 Al Ristorante - At the Restaurant',
      description: 'Order a delicious Italian meal',
      aiPersona: 'Sofia, an experienced waitress',
      startingMessage: 'Buonasera! Benvenuti! Ecco il menù.',
      vocabulary: ['pizza', 'pasta', 'antipasto', 'dolce', 'il conto']
    },
    market: {
      name: '🛒 Al Mercato - At the Market',
      description: 'Buy fresh produce from a vendor',
      aiPersona: 'Giuseppe, a market vendor',
      startingMessage: 'Buongiorno! Frutta fresca oggi! Cosa prende?',
      vocabulary: ['pomodori', 'mele', 'quanto costa', 'un chilo', 'troppo caro']
    },
    directions: {
      name: '🗺️ Chiedere Indicazioni - Asking Directions',
      description: 'Navigate the city with locals\' help',
      aiPersona: 'Anna, a helpful local',
      startingMessage: 'Ciao! Ti sei perso? Posso aiutarti?',
      vocabulary: ['dove', 'destra', 'sinistra', 'dritto', 'vicino']
    },
    hotel: {
      name: '🏨 In Hotel - At the Hotel',
      description: 'Check in and make requests',
      aiPersona: 'Luca, hotel receptionist',
      startingMessage: 'Buonasera! Ha una prenotazione?',
      vocabulary: ['camera', 'prenotazione', 'chiave', 'colazione', 'wifi']
    },
    shopping: {
      name: '👔 Fare Shopping - Shopping',
      description: 'Buy clothes and accessories',
      aiPersona: 'Elena, shop assistant',
      startingMessage: 'Buongiorno! Posso aiutarla a trovare qualcosa?',
      vocabulary: ['taglia', 'colore', 'quanto costa', 'provare', 'sconto']
    },
    pharmacy: {
      name: '💊 In Farmacia - At the Pharmacy',
      description: 'Get medicine and health advice',
      aiPersona: 'Dottoressa Rossi, pharmacist',
      startingMessage: 'Buongiorno! Come posso aiutarla?',
      vocabulary: ['mal di testa', 'febbre', 'medicina', 'ricetta', 'sintomi']
    },
    friends: {
      name: '👥 Con Amici - With Friends',
      description: 'Chat casually with Italian friends',
      aiPersona: 'Giulia, your Italian friend',
      startingMessage: 'Ciao! Come va? Hai fatto qualcosa di bello oggi?',
      vocabulary: ['come va', 'bello', 'andiamo', 'dopo', 'stasera']
    }
  };

  // Initialize conversation
  useEffect(() => {
    const currentScenario = scenarios[scenario];
    setMessages([
      {
        role: 'assistant',
        content: currentScenario.startingMessage,
        translation: getTranslation(currentScenario.startingMessage)
      }
    ]);
    sessionStartRef.current = Date.now();
  }, [scenario]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update session duration
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        sessionDuration: Math.floor((Date.now() - sessionStartRef.current) / 1000)
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTranslation = (italian: string): string => {
    // Simple translation mapping (in production, use proper API)
    const translations: { [key: string]: string } = {
      'Buongiorno! Cosa desidera oggi?': 'Good morning! What would you like today?',
      'Buonasera! Benvenuti! Ecco il menù.': 'Good evening! Welcome! Here\'s the menu.',
      'Buongiorno! Frutta fresca oggi! Cosa prende?': 'Good morning! Fresh fruit today! What will you take?',
      'Ciao! Ti sei perso? Posso aiutarti?': 'Hi! Are you lost? Can I help you?',
      'Buonasera! Ha una prenotazione?': 'Good evening! Do you have a reservation?',
      'Buongiorno! Posso aiutarla a trovare qualcosa?': 'Good morning! Can I help you find something?',
      'Buongiorno! Come posso aiutarla?': 'Good morning! How can I help you?',
      'Ciao! Come va? Hai fatto qualcosa di bello oggi?': 'Hi! How\'s it going? Did you do anything nice today?'
    };
    return translations[italian] || italian;
  };

  const analyzeResponse = async (userMessage: string): Promise<{
    feedback: 'correct' | 'needs_improvement' | 'excellent';
    grammar?: string;
    suggestion?: string;
  }> => {
    // This would call Claude API to analyze the response
    // For now, return mock analysis
    const hasItalianWords = /[àèéìòù]/i.test(userMessage);
    const isReasonableLength = userMessage.split(' ').length >= 2;
    
    if (hasItalianWords && isReasonableLength) {
      return { feedback: 'excellent' };
    } else if (hasItalianWords) {
      return { 
        feedback: 'correct',
        suggestion: 'Try to form complete sentences!'
      };
    } else {
      return {
        feedback: 'needs_improvement',
        grammar: 'Try to respond in Italian!',
        suggestion: 'Use the hints below for help.'
      };
    }
  };

  const getAIResponse = async (userMessage: string, conversationHistory: Message[]) => {
    // This will call the Anthropic API through the artifact's proxy
    const currentScenario = scenarios[scenario];
    
    const systemPrompt = `You are ${currentScenario.aiPersona} in a conversation with an Italian learner at ${level} level.
    
SCENARIO: ${currentScenario.description}

YOUR ROLE:
- Respond naturally in Italian as your character would
- Adjust complexity to ${level} level
- Include common mistakes correction
- Be encouraging and patient
- Use vocabulary from this list when appropriate: ${currentScenario.vocabulary.join(', ')}

RESPONSE FORMAT:
Respond with a JSON object containing:
{
  "italian": "Your response in Italian",
  "translation": "English translation",
  "grammar": "One grammar tip related to your response (optional)",
  "feedback": "Brief feedback on user's Italian (if they made mistakes)",
  "nextPrompt": "A gentle prompt to keep conversation going"
}

Keep responses natural, friendly, and level-appropriate. Encourage the learner!`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            ...conversationHistory.map(msg => ({
              role: msg.role === 'assistant' ? 'assistant' : 'user',
              content: msg.content
            })),
            {
              role: 'user',
              content: userMessage
            }
          ]
        })
      });

      const data = await response.json();
      const aiMessage = data.content.find((c: any) => c.type === 'text')?.text || '';
      
      // Try to parse as JSON, fallback to plain text
      try {
        return JSON.parse(aiMessage);
      } catch {
        return {
          italian: aiMessage,
          translation: 'Translation unavailable',
          grammar: '',
          feedback: ''
        };
      }
    } catch (error) {
      console.error('AI response error:', error);
      return {
        italian: 'Mi dispiace, non ho capito. Puoi ripetere?',
        translation: 'Sorry, I didn\'t understand. Can you repeat?',
        grammar: '',
        feedback: ''
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Analyze user's response
    const analysis = await analyzeResponse(input);

    // Get AI response
    const aiResponse = await getAIResponse(input, messages);

    const assistantMessage: Message = {
      role: 'assistant',
      content: aiResponse.italian,
      translation: aiResponse.translation,
      grammar: aiResponse.grammar,
      feedback: analysis.feedback
    };

    setMessages(prev => [...prev, assistantMessage]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      messagesExchanged: prev.messagesExchanged + 1,
      correctResponses: prev.correctResponses + (analysis.feedback !== 'needs_improvement' ? 1 : 0)
    }));

    setIsLoading(false);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'it-IT';
      recognition.continuous = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.start();
    } else {
      alert('Voice recognition not supported in this browser');
    }
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const resetConversation = () => {
    const currentScenario = scenarios[scenario];
    setMessages([
      {
        role: 'assistant',
        content: currentScenario.startingMessage,
        translation: getTranslation(currentScenario.startingMessage)
      }
    ]);
    setStats({
      messagesExchanged: 0,
      correctResponses: 0,
      wordsLearned: [],
      grammarPoints: [],
      sessionDuration: 0
    });
    sessionStartRef.current = Date.now();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🤖 AI Italian Conversation Partner
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Practice real conversations with your AI tutor Marco
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{stats.messagesExchanged}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Messages</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats.messagesExchanged > 0 
                    ? Math.round((stats.correctResponses / stats.messagesExchanged) * 100)
                    : 0}%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {formatTime(stats.sessionDuration)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Time</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-4">
            {/* Scenario Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose Scenario:
              </label>
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(scenarios).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
            </div>

            {/* Level Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Level:
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
                <option value="B1">B1 - Intermediate</option>
                <option value="B2">B2 - Upper-Intermediate</option>
                <option value="C1">C1 - Advanced</option>
                <option value="C2">C2 - Mastery</option>
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetConversation}
            className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Start New Conversation
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto mb-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p className="font-medium mb-1">{message.content}</p>
                        
                        {message.translation && message.role === 'assistant' && (
                          <p className="text-sm opacity-75 italic mt-2">
                            {message.translation}
                          </p>
                        )}
                        
                        {message.grammar && (
                          <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
                            <p className="text-xs font-semibold mb-1">💡 Grammar Tip:</p>
                            <p className="text-xs">{message.grammar}</p>
                          </div>
                        )}
                        
                        {message.feedback && message.role === 'assistant' && (
                          <div className="mt-2 flex items-center gap-2">
                            {message.feedback === 'excellent' && (
                              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                                ✨ Excellent!
                              </span>
                            )}
                            {message.feedback === 'correct' && (
                              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                                ✓ Correct
                              </span>
                            )}
                            {message.feedback === 'needs_improvement' && (
                              <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">
                                ⚠ Try again
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {message.role === 'assistant' && (
                        <button
                          onClick={() => speakText(message.content)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                        >
                          <Volume2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <button
                onClick={handleVoiceInput}
                disabled={isListening}
                className={`p-3 rounded-lg transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {isListening ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your response in Italian..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send size={20} />
                Send
              </button>
            </div>
          </div>

          {/* Hints Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageCircle size={24} />
              Helpful Hints
            </h3>
            
            <div className="space-y-4">
              {/* Key Vocabulary */}
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  📚 Key Vocabulary:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {scenarios[scenario].vocabulary.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => speakText(word)}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Common Phrases */}
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  💬 Common Phrases:
                </h4>
                <div className="space-y-2">
                  {[
                    { it: 'Non capisco', en: 'I don\'t understand' },
                    { it: 'Può ripetere?', en: 'Can you repeat?' },
                    { it: 'Come si dice...?', en: 'How do you say...?' },
                    { it: 'Più lentamente, per favore', en: 'More slowly, please' }
                  ].map((phrase, idx) => (
                    <button
                      key={idx}
                      onClick={() => speakText(phrase.it)}
                      className="w-full text-left p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <p className="font-medium text-sm text-gray-900 dark:text-white">
                        {phrase.it}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {phrase.en}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  💡 Tips:
                </h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                  <li>• Don't worry about mistakes!</li>
                  <li>• Try to respond in full sentences</li>
                  <li>• Use "per favore" to be polite</li>
                  <li>• Listen to pronunciation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
