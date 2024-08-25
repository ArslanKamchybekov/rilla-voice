// SummarySection.tsx
import React from 'react';

interface SummarySectionProps {
  comments: { [key: number]: { text: string; imageUrl?: string }[] };
  selectedEntryId: number | null;
}

const SummarySection: React.FC<SummarySectionProps> = ({ comments, selectedEntryId }) => {
  const getSummary = () => {
    if (selectedEntryId === null || !comments[selectedEntryId]) {
      return 'No comments for this entry.';
    }
    
    const commentCount = comments[selectedEntryId].length;
    const commentTexts = comments[selectedEntryId].map(comment => comment.text).join(', ');

    return `There are ${commentCount} comments for this entry: ${commentTexts}`;
  };

  return (
    <div className="flex-1 p-4 w-full bg-yellow-300 text-black rounded-lg">
      <div className="text-xl font-bold mb-2">Summary</div>
      <p>{getSummary()}</p>
    </div>
  );
};

export default SummarySection;
