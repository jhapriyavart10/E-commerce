'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Category, 
  Question, 
  categories, 
  getQuestionsByCategory, 
  findMatchingQuestion, 
  FALLBACK_MESSAGE 
} from '@/lib/chatbotData';

// Define interfaces for TypeScript
interface Message {
  type: 'user' | 'bot';
  text: string;
  time: string;
}

interface ChatBotProps {
  onClose?: () => void;
  onToggleExpand?: () => void;
  isMaximized?: boolean;
}

export default function ChatBot({ onClose, onToggleExpand, isMaximized }: ChatBotProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [view, setView] = useState<'categories' | 'questions' | 'chat'>('categories');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false); // Added missing state
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, view, isTyping]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategoryId(category.id);
    setView('questions');
  };

  const handleQuestionSelect = (question: Question) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { type: 'user', text: question.text, time };
    setChatHistory([userMsg]);
    setView('chat');
    
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = { type: 'bot', text: question.answer, time };
      setChatHistory(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };
    
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { type: 'user', text: inputValue, time: userTime };
    
    setChatHistory(prev => [...prev, userMsg]);
    setInputValue('');
    setView('chat');
    setIsTyping(true);

    setTimeout(() => {
      const match = findMatchingQuestion(inputValue);
      const botResponse = match ? match.answer : FALLBACK_MESSAGE;
      const botMsg: Message = { type: 'bot', text: botResponse, time: userTime };
      setChatHistory(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleBack = () => {
    if (view === 'chat' || view === 'questions') {
        setView(view === 'chat' ? 'questions' : 'categories');
    }
  };

  return (
    <>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="flex flex-col overflow-hidden relative w-full h-full"
        style={{
          width: isMaximized ? '100%' : '375px',
          height: isMaximized ? '100%' : '600px',
          borderRadius: isMaximized ? '0px' : '24px',
          background: '#280F0B',
          boxSizing: 'border-box',
        }}
      >
        {/* --- HEADER --- */}
        <header
          className="relative shrink-0 pt-8 px-6 m-0 flex flex-col"
          style={{
            width: '100%',
            height: view !== 'categories' ? '100px' : '221px',
            background: '#FFC26F',
            borderBottomLeftRadius: view !== 'categories' ? '0px' : '80px',
            transition: 'all 0.3s ease-in-out',
            boxSizing: 'border-box',
          }}
        >
          <div className="flex justify-between items-center mb-4">
            {view !== 'categories' ? (
              <button onClick={handleBack} className="cursor-pointer hover:opacity-70">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#280F0B" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
            ) : (
              <div className="w-12 h-12 relative">
                <Image src="/assets/images/logo.svg" alt="Logo" fill className="object-contain" priority />
              </div>
            )}

            {view !== 'categories' && (
              <div className="w-10 h-10 relative">
                <Image src="/assets/images/logo.svg" alt="Logo" fill className="object-contain" />
              </div>
            )}
            
            <div className="flex gap-4 text-[#280F0B]">
              <button onClick={onToggleExpand} className="hover:opacity-60 transition-opacity cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points={isMaximized ? "4 14 10 14 10 20" : "15 3 21 3 21 9"} />
                    <polyline points={isMaximized ? "20 10 14 10 14 4" : "9 21 3 21 3 15"} />
                    <line x1={isMaximized ? "14" : "21"} y1={isMaximized ? "10" : "3"} x2={isMaximized ? "21" : "14"} y2={isMaximized ? "3" : "10"} />
                    <line x1={isMaximized ? "10" : "3"} y1={isMaximized ? "14" : "21"} x2={isMaximized ? "3" : "10"} y2={isMaximized ? "21" : "14"} />
                </svg>
              </button>
              <button onClick={onClose} className="hover:opacity-60 transition-opacity cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          {view === 'categories' && (
            <>
              <h1 style={{ fontFamily: 'Lora, serif', fontWeight: '600', fontSize: '28px', lineHeight: '120%', color: '#280F0B' }}>
                Hello there,<br />How can we assist you?
              </h1>
              <div className="absolute bottom-0 right-0 w-[80px] h-[80px] bg-[#280F0B]" style={{ borderTopLeftRadius: '80px' }} />
            </>
          )}
        </header>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 px-6 pt-6 overflow-y-auto no-scrollbar" ref={scrollRef}>
          {view === 'categories' ? (
            <>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: '500', fontSize: '16px', color: '#F6D8AB', marginBottom: '12px' }}>
                Frequently asked questions
              </h2>
              <div className="flex flex-col gap-[8px] pb-4">
                {categories.map((category) => (
                  <button 
                    key={category.id} 
                    onClick={() => handleCategoryClick(category)}
                    className="w-full flex items-center justify-between py-3 border-b border-[#F6D8AB]/5 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: '400', fontSize: '14px', color: '#CCB48F' }}>
                      {category.name}
                    </span>
                    <svg className="w-4 h-4 text-[#CCB48F] opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </>
          ) : view === 'questions' ? (
            <div className="flex flex-col gap-[8px] pb-4">
              {getQuestionsByCategory(activeCategoryId || '').map((q) => (
                <button 
                  key={q.id} 
                  onClick={() => handleQuestionSelect(q)}
                  className="w-full text-left py-3 border-b border-[#F6D8AB]/5 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: '400', fontSize: '14px', color: '#CCB48F' }}>
                    {q.text}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6 pb-4">
              <div className="text-center text-[#CCB48F]/50 text-xs font-medium uppercase tracking-wider">Yesterday</div>
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div 
                    style={{ 
                      background: msg.type === 'user' ? '#633529' : 'transparent',
                      color: '#E8D5B7',
                      padding: msg.type === 'user' ? '12px 16px' : '0px',
                      borderRadius: '12px',
                      maxWidth: '85%',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      fontFamily: 'Manrope, sans-serif'
                    }}
                  >
                    {msg.text}
                  </div>
                  <div className="mt-2 text-[10px] text-[#CCB48F]/60">
                    {msg.type === 'bot' ? `REC Support • ${msg.time}` : msg.time}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-[#CCB48F]/60 text-xs italic animate-pulse">
                  REC Support is typing...
                </div>
              )}
            </div>
          )}
        </main>

        {/* --- FOOTER INPUT --- */}
        <footer className="p-6 bg-[#280F0B] shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 h-[44px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F6D8AB] opacity-60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
              </span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question..."
                className="w-full h-full bg-[#1F0C09] border border-[#F6D8AB]/10 rounded-full pl-12 pr-4 text-[#F6D8AB] text-sm focus:outline-none"
              />
            </div>
            <button 
              onClick={handleSendMessage}
              className="w-11 h-11 bg-[#633529] text-white rounded-full flex items-center justify-center shrink-0 hover:bg-[#7a4233] transition-colors cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}