'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JobDescriptionForm() {
  const [jobDescription, setJobDescription] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const readCV = (): Promise<string> =>
    new Promise((resolve, reject) => {
      if (!cv) return reject('CV missing');
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result?.toString() || '';
        if (content.trim().length < 30) {
          reject('Candidate CV must be at least 30 characters.');
        } else {
          resolve(content);
        }
      };
      reader.onerror = () => reject('CV read error');
      reader.readAsText(cv);
    });

  const handleStartInterview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (jobDescription.trim().length < 30) {
      setError('Job Description must be at least 30 characters.');
      return;
    }

    if (!cv) {
      setError('Please upload a Candidate CV.');
      return;
    }

    try {
      const candidateCV = await readCV();

      localStorage.setItem('jobDescription', jobDescription.trim());
      localStorage.setItem('candidateCV', candidateCV.trim());

      router.push('/interview');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error reading CV file:', err.message);
        setError(err.message || 'Error reading CV file.');
      } else {
        console.error('Unknown error reading CV file:', err);
        setError('Error reading CV file.');
      }
    }
  };

  return (
    <form onSubmit={handleStartInterview} className="space-y-6">
      {/* Job Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={6}
          className="w-full p-3 border rounded-md shadow-sm"
          placeholder="Paste job description here..."
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Minimum 30 characters required.
        </p>
      </div>

      {/* CV Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Candidate CV (TXT, PDF, DOCX)</label>
        <input
          type="file"
          accept=".pdf,.txt,.docx"
          onChange={(e) => setCv(e.target.files?.[0] || null)}
          className="block text-sm border rounded-md py-2 px-3"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Minimum 30 characters required after file read.
        </p>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Start Interview Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
          disabled={jobDescription.trim().length < 30 || !cv}
        >
          Start Interview
        </button>
      </div>
    </form>
  );
}
