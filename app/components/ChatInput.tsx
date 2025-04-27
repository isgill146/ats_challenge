'use client';

import { useState } from 'react';

type Props = {
  onSend: (text: string) => void;
};

export default function ChatInput({ onSend }: Props) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your answer..."
        className="flex-1 border rounded-md py-2 px-3 text-sm"
      />
      <button
        type="button"
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
      >
        Send
      </button>
    </div>
  );
}
