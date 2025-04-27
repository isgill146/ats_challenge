'use client';

import JobDescriptionForm from './components/JobDescriptionForm';

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Interview Assistant</h1>
      <JobDescriptionForm />
    </main>
  );
}
