import { Plus } from 'lucide-react';
import type { Message } from '../../types';

interface ChatBubbleProps {
  message: Message;
  onAddRecommendation?: (id: string) => void;
}

export default function ChatBubble({ message, onAddRecommendation }: ChatBubbleProps) {
  return (
    <div className={`chat-bubble ${message.sender}`}>
      <p>{message.text}</p>
      {message.recommendationId && onAddRecommendation && (
        <button
          type="button"
          className="chat-rec-btn"
          onClick={() => onAddRecommendation(message.recommendationId!)}
        >
          <Plus size={12} />
          Configure Recommendation
        </button>
      )}
    </div>
  );
}
