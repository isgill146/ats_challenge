type Props = {
  questions: string | null;
};

export default function QuestionOutput({ questions }: Props) {
  if (!questions) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Generated Interview Questions</h2>
      <div className="bg-gray-50 border p-4 rounded-md shadow text-gray-700 whitespace-pre-wrap">
        {questions}
      </div>
    </div>
  );
}
