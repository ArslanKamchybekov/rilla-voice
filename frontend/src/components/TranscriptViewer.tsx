import React, { useState } from 'react';

interface TranscriptViewerProps {
  selectedEntryId: number | null;
  onSelectEntry: (id: number) => void;
  onAddComment: (newComment: string) => void;
  comments: { [key: number]: string[] };
  onEditComment: (index: number) => void;
  onSaveComment: (text: string) => void;
  onCancel: () => void;
}

const transcriptData = [
  { id: 1, speaker: 'Salesperson', text: 'Good morning! How can I help you today?' },
  { id: 2, speaker: 'Customer', text: 'I’m interested in your product, but I have a few questions.' },
  { id: 3, speaker: 'Salesperson', text: 'Sure! I’m here to answer any questions you have.' },
  { id: 4, speaker: 'Customer', text: 'What is the warranty period?' },
  { id: 5, speaker: 'Salesperson', text: 'The product comes with a 2-year warranty, covering all manufacturing defects.' },
  { id: 6, speaker: 'Customer', text: 'That sounds great. What about the return policy?' },
  { id: 7, speaker: 'Salesperson', text: 'We have a 30-day return policy with no questions asked.' },
  { id: 8, speaker: 'Customer', text: 'Perfect! I’d like to place an order.' },
  { id: 9, speaker: 'Salesperson', text: 'Great! I’ll help you with the process. Thank you for choosing our product!' },
];

const TranscriptViewer: React.FC<TranscriptViewerProps> = ({
  selectedEntryId,
  onSelectEntry,
  onAddComment,
  comments,
  onEditComment,
  onSaveComment,
  onCancel
}) => {
  const [comment, setComment] = useState('');
  const [hoveredEntryId, setHoveredEntryId] = useState<number | null>(null);

  const handleAddCommentClick = () => {
    if (comment.trim() !== '') {
      onAddComment(comment);
      setComment('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents a new line from being added in the textarea
      handleAddCommentClick();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold bg-yellow-500 text-center">Conversation Transcript</h2>
      <div className="mt-4 bg-white p-4 rounded shadow-lg h-96 overflow-y-scroll">
        {transcriptData.map((entry) => (
          <div
            key={entry.id}
            className={`relative my-2 p-2 border ${selectedEntryId === entry.id ? 'border-yellow-500 bg-yellow-100' : 'border-gray-300'}`}
            onClick={() => onSelectEntry(entry.id)}
            onMouseEnter={() => setHoveredEntryId(entry.id)}
            onMouseLeave={() => setHoveredEntryId(null)}
          >
            <p className="font-bold">{entry.speaker}:</p>
            <p>{entry.text}</p>
            {hoveredEntryId === entry.id && (
              <div className="absolute top-0 right-0 mt-1 mr-1 p-2 bg-gray-200 text-sm rounded shadow-lg">
                Click to comment
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedEntryId !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Add your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
          />
          <button
            className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={handleAddCommentClick}
          >
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default TranscriptViewer;
