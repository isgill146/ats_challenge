'use client';

type Props = {
  sender: 'ai' | 'user' | 'system';
  text: string;
};

export default function ChatBubble({ sender, text }: Props) {
  if (sender === 'system') {
    return (
      <div className="text-center text-sm text-gray-500 my-4">
        {text}
      </div>
    );
  }

  const isAI = sender === 'ai';

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div className={`rounded-lg p-3 max-w-[80%] text-sm shadow ${isAI ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
        {text}
      </div>
    </div>
  );
}
