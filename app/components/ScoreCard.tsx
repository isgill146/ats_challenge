type Props = {
    technicalAcumen: number;
    communicationSkills: number;
    responsivenessAgility: number;
    problemSolvingAdaptability: number;
    culturalFit: number;
    overallScore: number;
    summary: string;
  };
  
  export default function ScoreCard({
    technicalAcumen,
    communicationSkills,
    responsivenessAgility,
    problemSolvingAdaptability,
    culturalFit,
    overallScore,
    summary,
  }: Props) {
    return (
      <div className="bg-white p-6 rounded-md shadow-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Candidate Fit Score Breakdown</h2>
  
        <div className="space-y-2 text-left text-gray-700">
          <p><strong>Technical Acumen:</strong> {technicalAcumen} / 10</p>
          <p><strong>Communication Skills:</strong> {communicationSkills} / 10</p>
          <p><strong>Responsiveness & Agility:</strong> {responsivenessAgility} / 10</p>
          <p><strong>Problem-Solving & Adaptability:</strong> {problemSolvingAdaptability} / 10</p>
          <p><strong>Cultural Fit & Soft Skills:</strong> {culturalFit} / 10</p>
        </div>
  
        <div className="mt-4 text-lg font-semibold">
          Overall Score: {overallScore} / 10
        </div>
  
        <div className="mt-2 text-gray-600">
          {summary}
        </div>
      </div>
    );
  }
  
  