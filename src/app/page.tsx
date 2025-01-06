"use client"

import Image from 'next/image';
import { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import { Send, Link, User } from 'lucide-react';

interface Message {
    id: string;
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
    const messagesEndRef = useRef<HTMLDivElement>(null);

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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSuggestionClick = (suggestion: SuggestionCard) => {
        setInputMessage(suggestion.title);
        setShowSuggestions(false);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedMessage = inputMessage.trim();
        if (!trimmedMessage || isLoading) return;

        setShowSuggestions(false);

        const userMessage: Message = {
            id: Date.now().toString(),
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
                    id: `assistant-${Date.now()}`,
                    role: 'assistant',
                    content: data.message,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, assistantMessage]);
            }
        } catch (error) {
            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                role: 'system',
                content: error instanceof Error ? error.message : 'An error occurred',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#d9d9f3] to-[#f3e6e6] text-gray-800">
            {/* Header */}
            <div className="max-w-full mx-auto flex items-center justify-between px-4 py-3 sticky top-0 bg-opacity-90 backdrop-blur-sm z-10">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    </div>
                    <span className="text-sm font-semibold text-gray-800">Socially</span>
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <User className="w-4 h-4 text-gray-500" />
                </button>
            </div>

            <div className="max-w-7xl mx-auto min-h-[calc(100vh-64px)] flex flex-col">
                <div className="flex-1 overflow-y-auto px-4">
                    {showSuggestions && messages.length === 0 ? (
                        <div className="h-full flex flex-col justify-center mt-10">
                            <div className="text-center mb-8 animate-fadeIn">
                                <div className="w-16 h-16  rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Image width={84} height={84} src="/favicon.ico" alt="favicon" />
                                </div>
                                <h1 className="text-xl md:text-3xl font-semibold text-[#A3989E] mb-2">
                                    Welcome to Socially!
                                </h1>
                                <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4">
                                    Can we help you with social media?
                                </h2>
                                <div className="text-[#938B91] flex flex-col max-w-auto mx-auto px-2 text-sm">
                                    <span>Ready to assist you with anything you need, from answering</span>
                                    <span>questions to providing recommendations. Let's get started!</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto px-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideIn`}
                                >
                                    <div
                                        className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 ${message.role === 'user'
                                                ? 'bg-black text-white ml-auto'
                                                : message.role === 'system'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-white text-gray-800'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                                        <div className="text-xs mt-2 opacity-70">
                                            {new Date(message.timestamp).toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                            {isLoading && (
                                <div className="flex justify-center p-4">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {showSuggestions && messages.length === 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-xl mx-auto w-full px-4 md:px-0 mb-6">
                        {suggestionCards.map((card, index) => (
                            <button
                                key={index}
                                onClick={() => handleSuggestionClick(card)}
                                className="bg-white p-6 rounded-2xl drop-shadow-sm text-left hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1"
                            >
                                <div className="text-2xl mb-4 bg-[#ECEAEA] w-12 rounded-2xl h-12 self-center p-2"></div>
                                <h3 className="font-semibold text-[#323232] text-base mb-1 line-clamp-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-[#989396]">{card.subtitle}</p>
                            </button>
                        ))}
                    </div>
                )}

                <div className="p-4 md:p-6 w-full max-w-2xl mx-auto">
                    <div className='flex flex-row justify-between items-center gap-4 max-w-2xl mx-auto'>
                        <button
                            type="button"
                            className="w-12 h-12 bg-[#ECEAEA] rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm"
                            onClick={() => { }}
                        >
                            <span className="text-2xl">🎯</span>
                        </button>
                        <form onSubmit={handleSubmit} className="w-full relative">

                            <div className="flex-1 flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
                                <div className="flex p-1 items-center gap-2">
                                    <button
                                        type="button"
                                        className="p-2 hover:bg-gray-100 bg-[#ECEAEA] rounded-full transition-colors drop-shadow-lg hidden md:flex"
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
                                    className="bg-[#ED9882] drop-shadow-lg text-white px-4 py-2 rounded-full flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors hover:bg-[#e88a73] active:bg-[#d47a64]"
                                >
                                    <span className="hidden md:inline">Send</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
