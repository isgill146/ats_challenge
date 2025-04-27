'use client';

import { useEffect, useState } from 'react';
import InterviewChat from '../components/InterviewChat';

export default function InterviewPage() {
  const [jd, setJd] = useState<string | null>(null);
  const [cv, setCv] = useState<string | null>(null);

  useEffect(() => {
    const jobDescription = localStorage.getItem('jobDescription');
    const candidateCV = localStorage.getItem('candidateCV');
    setJd(jobDescription);
    setCv(candidateCV);
  }, []);

  if (!jd || !cv) {
    return (
      <div className="text-center py-20">
        <h2 className="text-lg text-gray-700">Missing Job Description or Candidate CV. Please go back and fill the form first.</h2>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Interactive Interview</h1>
      <InterviewChat jobDescription={jd} candidateCV={cv} />
    </main>
  );
}
