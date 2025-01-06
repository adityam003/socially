// components/ChatInterface.tsx
"use client"

import { useState, FormEvent, ChangeEvent } from 'react';
import { Send, Settings, Link, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface SuggestionCard {
  icon: string;
  title: string;
  subtitle: string;
}

interface ChatResponse {
  message?: string;
  error?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);

  const suggestionCards: SuggestionCard[] = [
    {
      icon: "🌎",
      title: "Wanderlust Destinations 2024",
      subtitle: "Must-Visit Places"
    },
    {
      icon: "✨",
      title: "SayHalo AI: What Sets Us Apart",
      subtitle: "Key Differentiators"
    },
    {
      icon: "📱",
      title: "Design Trends on TikTok 2024",
      subtitle: "Trending Now"
    }
  ];

  const handleSuggestionClick = (suggestion: SuggestionCard) => {
    setInputMessage(suggestion.title);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    setShowSuggestions(false);
    
    const userMessage: Message = {
      role: 'user',
      content: trimmedMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data: ChatResponse = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.message) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'system',
        content: error instanceof Error ? error.message : 'An error occurred',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d9d9f3] to-[#f3e6e6] text-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white">👋</span>
            </div>
            <span className="text-sm font-medium">SayHalo</span>
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </button>
        </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto min-h-[calc(100vh-64px)] flex flex-col">
        <div className="flex-1 overflow-y-auto px-4">
          {showSuggestions && messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center -mt-16">
              {/* Welcome Section */}
              <div className="text-center mb-16">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">👋</span>
                </div>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  Hi, Aniket
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                  Can I help you with your social media?
                </h2>
                <p className="text-gray-500 max-w-md mx-auto px-4">
                  Ready to assist you with anything you need, from answering
                  questions to providing recommendations. Let's get started!
                </p>
              </div>
            </div>
            
          ) : (
            
            <div className="space-y-4 pb-4">
              
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[75%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                </div>
              )}
            </div>
          )}
        </div>

         {/* ye suggestion card hai   */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto w-full px-4 md:px-0">
                {suggestionCards.map((card, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(card.title)}
                    className="bg-white p-6 rounded-2xl text-left hover:shadow-lg transition-shadow duration-200 ease-in-out"
                  >
                    <div className="text-2xl mb-4">{card.icon}</div>
                    <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-500">{card.subtitle}</p>
                  </button>
                ))}
              </div>

        {/* yaha Input Area hai  */}
        <div className="p-4 md:p-6 w-full max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-2 bg-white rounded-xl p-2 shadow-sm">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden md:flex"
                >
                  <Settings className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden md:flex"
                >
                  <Link className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <input
                type="text"
                value={inputMessage}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                placeholder="Ask SayHalo anything..."
                className="flex-1 px-3 py-2 outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden md:inline">Send</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;