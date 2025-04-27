'use client';

import { useEffect, useState, useRef } from 'react';

type Message = {
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

type Props = {
  jobDescription: string;
  candidateCV: string;
};

export default function InterviewChat({ jobDescription, candidateCV }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [answerTimes, setAnswerTimes] = useState<number[]>([]);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [fitScore, setFitScore] = useState<null | {
    technicalAcumen: number;
    communicationSkills: number;
    responsivenessAgility: number;
    problemSolvingAdaptability: number;
    culturalFit: number;
    overallScore: number;
    summary: string;
  }>(null);
  
  const [scoring, setScoring] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const startTimeRef = useRef<number | null>(null);
  const maxTurns = 8;

  useEffect(() => {
    startInterview();
  }, []);

  useEffect(() => {
    if (interviewEnded && !fitScore) {
      evaluateCandidateFit();
    }
  }, [interviewEnded]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const startInterview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription,
          candidateCV,
          conversationHistory: [],
        }),
      });

      const data = await res.json();
      if (data.nextQuestion) {
        setMessages([
          {
            sender: 'assistant',
            content: data.nextQuestion,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        startTimeRef.current = Date.now();
      }
    } catch (err) {
      console.error('Error starting interview:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updatedMessages: Message[] = [
      ...messages,
      {
        sender: 'user',
        content: input,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(updatedMessages);

    const totalUserTurns = updatedMessages.filter((m) => m.sender === 'user').length;

    if (startTimeRef.current) {
      const duration = Date.now() - startTimeRef.current;
      setAnswerTimes((prev) => [...prev, duration]);
    }

    setInput('');
    setLoading(true);

    if (totalUserTurns >= maxTurns) {
      setInterviewEnded(true);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription,
          candidateCV,
          conversationHistory: updatedMessages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      if (data.nextQuestion) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'assistant',
            content: data.nextQuestion,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        startTimeRef.current = Date.now();
      }
    } catch (err) {
      console.error('Error during interview chat:', err);
    } finally {
      setLoading(false);
    }
  };

  const evaluateCandidateFit = async () => {
    setScoring(true);
    try {
      const candidateAnswers = messages
        .filter((msg) => msg.sender === 'user')
        .map((msg) => msg.content)
        .join('\n\n');

        const averageAnswerTime = Math.round(
            answerTimes.reduce((sum, t) => sum + t, 0) / answerTimes.length / 1000
        );

      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription,
          candidateCV,
          candidateAnswers,
          averageAnswerTime,
        }),
      });

      const data = await res.json();
      setFitScore(data);
    } catch (err) {
      console.error('Error scoring candidate:', err);
    } finally {
      setScoring(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gray-50 p-6 rounded-md shadow space-y-6">
        {messages.map((msg, idx) => (
            <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
            <div className="max-w-sm">
                <div
                className={`px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-200 text-gray-800'
                }`}
                >
                <div className="font-semibold text-sm mb-1">
                    {msg.sender === 'user' ? 'You' : 'Interviewer'}
                </div>
                <div>{msg.content}</div>
                <div className="text-xs text-gray-500 mt-1 text-right">
                    {msg.timestamp}
                </div>
                </div>
            </div>
            </div>
        ))}

        {loading && (
            <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 max-w-sm px-4 py-2 rounded-lg">
                <div className="font-semibold text-sm mb-1">Interviewer</div>
                <div>Typing...</div>
            </div>
            </div>
        )}
        </div>

        <div ref={bottomRef} />


      {!interviewEnded ? (
        <div className="flex gap-4 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !loading) {
                e.preventDefault();
                sendMessage();
              }
            }}
            disabled={loading}
            className="flex-1 border rounded-md p-3"
            placeholder="Type your answer here and press Enter..."
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
          >
            Send
          </button>
        </div>
      ) : (
        <div className="text-center mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Interview Completed</h2>
          <p className="text-gray-600">
            Great job! We are evaluating your responses...
          </p>

          {scoring && (
            <p className="mt-4 text-gray-500">Evaluating candidate fit...</p>
          )}

          {fitScore && (
            <div className="bg-white p-6 rounded-md shadow-md mt-6 text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Candidate Fit Score</h2>
              <div className="bg-white p-6 rounded-md shadow-md mt-6 text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Candidate Fit Score Breakdown</h2>

                <div className="space-y-2 text-left text-gray-700">
                    <p><strong>Technical Acumen:</strong> {fitScore.technicalAcumen} / 10</p>
                    <p><strong>Communication Skills:</strong> {fitScore.communicationSkills} / 10</p>
                    <p><strong>Responsiveness & Agility:</strong> {fitScore.responsivenessAgility} / 10</p>
                    <p><strong>Problem Solving & Adaptability:</strong> {fitScore.problemSolvingAdaptability} / 10</p>
                    <p><strong>Cultural Fit & Soft Skills:</strong> {fitScore.culturalFit} / 10</p>
                </div>

                <div className="mt-4 text-lg font-semibold">
                    Overall Score: {fitScore.overallScore} / 10
                </div>

                <div className="mt-2 text-gray-600">
                    {fitScore.summary}
                </div>
                </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
