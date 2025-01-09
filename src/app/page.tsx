"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, FormEvent, ChangeEvent, useRef, useEffect } from "react";
import { Send, ChartPie, WandSparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface Message {
    id: string;
    role: "user" | "assistant" | "system";
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
    const [inputMessage, setInputMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const suggestionCards: SuggestionCard[] = [
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8E8E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`,
            title: "Upcoming Trends in 2024",
            subtitle: "Must try",
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8E8E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>`,
            title: "Post Performance Insights",
            subtitle: "Key Differentiators",
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8E8E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tv-minimal-play"><path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z"/><path d="M7 21h10"/><rect width="20" height="14" x="2" y="3" rx="2"/></svg>`,
            title: "Smarter Content Strategies",
            subtitle: "Trending Now",
        },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
            role: "user",
            content: trimmedMessage,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: trimmedMessage }),
            });

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            const data: ChatResponse = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data.message) {
                const assistantMessage: Message = {
                    id: `assistant-${Date.now()}`,
                    role: "assistant",
                    content: data.message,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, assistantMessage]);
            }
        } catch (error) {
            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                role: "system",
                content: error instanceof Error ? error.message : "An error occurred",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to reset the state
    const resetState = () => {
        setMessages([]); // Clear all messages
        setInputMessage(""); // Clear input
        setShowSuggestions(true); // Show suggestions again
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f5cbc4] via-[#e8b4eb] to-[#c7d3f4] text-gray-800">
            {/* Header */}
            <div className="max-w-full mx-auto flex items-center justify-between px-4 py-3 sticky top-0 bg-opacity-90 backdrop-blur-sm z-10">
                <div
                    className="flex items-center space-x-2 cursor-pointer" // Add cursor-pointer for better UX
                    onClick={resetState} // Attach the click handler to reset state
                >
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <WandSparkles width={14} height={14} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">Dev Dynamos</span>
                </div>
                <Link href={"https://github.com/adityam003/socially"}>
                    <button className="rounded-full bg-black flex items-center px-4 py-3 justify-center transition-colors">
                        <div className="flex flex-row justify-between gap-2 items-center">
                            <Image src="./ghub.svg" width={18} height={4} alt="Github" />
                            <span className="text-white font-medium text-sm">Github</span>
                        </div>
                    </button>
                </Link>
            </div>

            {/* Rest of the component */}
            <div className="max-w-7xl mx-auto min-h-[calc(100vh-64px)] flex flex-col">
                <div className={`flex-1 overflow-y-auto px-4 flex flex-col overrflow-y-auto ${showSuggestions || !isLoading ? "justify-start" : "justify-end"}`}>
                    {showSuggestions && messages.length === 0 ? (
                        <div className="h-full flex flex-col justify-center mt-10">
                            <div className="text-center mb-8 animate-fadeIn">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Image
                                        width={84}
                                        height={84}
                                        src="/favicon.ico"
                                        alt="favicon"
                                    />
                                </div>
                                <h1 className="text-xl md:text-3xl font-semibold text-[#A3989E] mb-2">
                                    Welcome to Socially!
                                </h1>
                                <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4">
                                    Unlock smarter social media strategies
                                </h2>
                                <div className="text-[#938B91] flex flex-col max-w-auto mx-auto px-2 text-sm">
                                    <span>
                                        Ready to assist you with anything you need, from answering
                                    </span>
                                    <span>
                                        questions to providing recommendations. Lets get started!
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center flex-1">
                            <div className="max-w-2xl  px-4 space-y-4 flex flex-col flex-1 overflow-y-auto">
                                <div className="flex-1"></div>
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`w-full flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-slideIn`}
                                    >
                                        <div
                                            className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 ${message.role === "user"
                                                ? "bg-black text-white"
                                                : message.role === "system"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-white text-gray-800"
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap break-words">
                                                {message.content}
                                            </p>
                                            <div className="text-xs mt-2 opacity-70">
                                                {new Date(message.timestamp).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                                {isLoading && (
                                    <div className="flex w-full justify-start animate-slideIn">
                                        <div className="bg-white text-gray-800 max-w-[85%] md:max-w-[75%] rounded-2xl p-4">
                                            <div className="flex items-center space-x-1">
                                                <p className="text-sm text-gray-400">
                                                    Thinking<span className="after:content-[''] after:animate-dots after:inline-block after:w-4"></span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {showSuggestions && messages.length === 0 && (
                    <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-xl mx-auto w-full px-4 md:px-0 mb-6">
                        {suggestionCards.map((card, index) => (
                            <button
                                key={index}
                                onClick={() => handleSuggestionClick(card)}
                                className="bg-white p-6 rounded-2xl drop-shadow-sm text-left hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1"
                            >
                                <div
                                    className="text-2xl mb-4 bg-[#454647] w-12 rounded-2xl h-12 flex items-center justify-center p-2"
                                    dangerouslySetInnerHTML={{ __html: card.icon }}
                                ></div>
                                <h3 className="font-semibold text-[#323232] text-base mb-1 line-clamp-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-[#989396]">{card.subtitle}</p>
                            </button>
                        ))}
                    </div>
                )}

                <div className="p-4 md:p-6 w-full max-w-2xl mx-auto">
                    <div className="flex flex-row justify-between items-center gap-4 max-w-2xl mx-auto">
                        <button
                            type="button"
                            className="w-12 h-12 bg-[#454647] rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors shadow-sm"
                            onClick={() => router.push("/analytics")}
                        >
                            <ChartPie className="text-white" />
                        </button>
                        <form onSubmit={handleSubmit} className="w-full relative">
                            <div className="flex-1 flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
                                <div className="flex p-1 items-center gap-2">
                                </div>
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setInputMessage(e.target.value)
                                    }
                                    placeholder="Ask about social media posts..."
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
