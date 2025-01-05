"use client"
import { useState, FormEvent, ChangeEvent } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message?: string;
  error?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data: ChatResponse;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response:', e);
        throw new Error('Invalid response from server');
      }

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to get response');
      }

      if (!data.message) {
        throw new Error('No message in response');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'system',
        content: error instanceof Error ? error.message : 'Sorry, there was an error processing your message.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              message.role === 'user'
                ? 'bg-blue-100 ml-auto max-w-[80%]'
                : message.role === 'assistant'
                ? 'bg-gray-100 mr-auto max-w-[80%]'
                : 'bg-red-100 mr-auto max-w-[80%]'
            }`}
          >
            <p className="text-sm font-semibold mb-1">
              {message.role === 'user' ? 'You' :
               message.role === 'assistant' ? 'Assistant' : 'System'}
            </p>
            <p>{message.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
