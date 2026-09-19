import type { RefObject } from 'react';
import { Sparkles, Send } from 'lucide-react';
import ChatBubble from './ChatBubble';
import type { Message } from '../../types';

interface AiBaristaProps {
  messages: Message[];
  chatEndRef: RefObject<HTMLDivElement | null>;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onAddRecommendation: (id: string) => void;
}

export default function AiBarista({
  messages,
  chatEndRef,
  inputValue,
  onInputChange,
  onSendMessage,
  onAddRecommendation,
}: AiBaristaProps) {
  return (
    <section className="ai-barista-card glass-panel" aria-label="Aura the Barista AI Chatbot">
      <div className="ai-header">
        <div className="ai-avatar">
          <Sparkles size={16} />
        </div>
        <div className="ai-name-col">
          <h4 className="ai-name">Aura — Barista AI</h4>
          <span className="ai-status">
            <span className="pulse-indicator playing"></span>
            Online
          </span>
        </div>
      </div>

      <div className="ai-chat-messages">
        {messages.map((msg, i) => (
          <ChatBubble
            key={i}
            message={msg}
            onAddRecommendation={onAddRecommendation}
          />
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="ai-chat-input-row">
        <input
          type="text"
          className="ai-chat-input"
          placeholder="Ask Aura (e.g. 'I am tired' or 'Something sweet')..."
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
        />
        <button
          className="ai-send-btn"
          onClick={onSendMessage}
          aria-label="Send message to Aura"
        >
          <Send size={14} />
        </button>
      </div>
    </section>
  );
}
