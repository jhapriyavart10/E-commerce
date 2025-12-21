'use client';

import { useState, useRef, useEffect } from 'react';
import { categories, questions, FALLBACK_MESSAGE, GREETING_MESSAGE, findMatchingQuestion, getQuestionsByCategory, Question } from '@/lib/chatbotData';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  quickReplies?: { id: string; text: string; type: 'category' | 'question' }[];
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: GREETING_MESSAGE,
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: categories.map(cat => ({ id: cat.id, text: `${cat.icon} ${cat.name}`, type: 'category' as const }))
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (text: string, sender: 'user' | 'bot', quickReplies?: { id: string; text: string; type: 'category' | 'question' }[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      quickReplies
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleCategorySelect = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    addMessage(`${category.icon} ${category.name}`, 'user');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const categoryQuestions = getQuestionsByCategory(categoryId);
      const quickReplies = categoryQuestions.slice(0, 4).map(q => ({
        id: q.id,
        text: q.text,
        type: 'question' as const
      }));
      
      addMessage(
        `Here are some common questions about ${category.name.toLowerCase()}. Tap a question or type your own:`,
        'bot',
        quickReplies
      );
    }, 800);
  };

  const handleQuestionClick = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    addMessage(question.text, 'user');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      addMessage(question.answer, 'bot', [
        { id: 'more', text: 'Ask another question', type: 'category' as const }
      ]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, 'user');
    setInputValue('');
    setIsTyping(true);

    const matchedQuestion = findMatchingQuestion(userMessage);

    setTimeout(() => {
      setIsTyping(false);
      if (matchedQuestion) {
        addMessage(matchedQuestion.answer, 'bot', [
          { id: 'more', text: 'Ask another question', type: 'category' as const }
        ]);
      } else {
        const quickReplies = categories.map(cat => ({ 
          id: cat.id, 
          text: `${cat.icon} ${cat.name}`, 
          type: 'category' as const 
        }));
        addMessage(FALLBACK_MESSAGE, 'bot', quickReplies);
      }
    }, 1000);
  };

  const handleQuickReply = (reply: { id: string; text: string; type: 'category' | 'question' }) => {
    if (reply.type === 'category') {
      if (reply.id === 'more') {
        const quickReplies = categories.map(cat => ({ 
          id: cat.id, 
          text: `${cat.icon} ${cat.name}`, 
          type: 'category' as const 
        }));
        addMessage('I need help with something else', 'user');
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addMessage('Of course! What can I help you with?', 'bot', quickReplies);
        }, 600);
      } else {
        handleCategorySelect(reply.id);
      }
    } else {
      handleQuestionClick(reply.id);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#F6D8AB] to-[#E8D5B7]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-[450px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#794936] to-[#5d3628] flex items-center justify-center text-white font-bold text-lg">
              ✨
            </div>
            <div>
              <h1 className="font-semibold text-[#280F0B] text-base">Raw Earth Crystal Assistant</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-gray-600">Online</span>
              </div>
            </div>
          </div>
          <Link href="/" className="text-[#794936] hover:text-[#5d3628]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-[450px] mx-auto space-y-4">
          {messages.map((message, index) => (
            <div key={message.id}>
              <div
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-[#794936] text-white rounded-tr-sm'
                      : 'bg-white text-[#280F0B] rounded-tl-sm'
                  }`}
                  style={{
                    animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`
                  }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1.5 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Quick Reply Chips */}
              {message.quickReplies && message.quickReplies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2 ml-0">
                  {message.quickReplies.map((reply) => (
                    <button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply)}
                      className="px-4 py-2 bg-white text-[#794936] border border-[#794936] rounded-full text-sm font-medium hover:bg-[#794936] hover:text-white transition-all duration-200 shadow-sm"
                    >
                      {reply.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-[#280F0B] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Sticky Input Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-[450px] mx-auto px-4 py-3">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-[#794936] transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-sm focus:outline-none text-[#280F0B] placeholder-gray-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="w-9 h-9 bg-[#794936] text-white rounded-full flex items-center justify-center hover:bg-[#5d3628] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Powered by Crystal Shop
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 1.4s infinite;
        }
      `}</style>
    </div>
  );
}
