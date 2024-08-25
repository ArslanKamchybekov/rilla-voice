import React, { useState } from 'react';

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

type TranscriptViewerProps = {
  selectedEntryId: number | null;
  onSelectEntry: (id: number) => void;
  onAddComment: (comment: string, imageUrl: string | undefined) => void;
  comments: { [key: number]: { text: string; imageUrl?: string }[] };
  onEditComment: (id: number) => void;
  onSaveComment: (id: number, text: string, imageUrl: string | undefined) => void;
  onCancel: () => void;
  onUploadImage: (imageFile: File) => void;
};

const TranscriptViewer: React.FC<TranscriptViewerProps> = ({
  selectedEntryId,
  onSelectEntry,
  onAddComment,
  comments,
  onEditComment,
  onSaveComment,
  onCancel,
  onUploadImage
}) => {
  const [comment, setComment] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleAddCommentClick = () => {
    if (comment.trim() !== '' || imageUrl) {
      onAddComment(comment, imageUrl || undefined);
      setComment('');
      setImageUrl(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setImageUrl(url);
        onUploadImage(file); // Notify parent component
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddCommentClick();
    }
  };

  return (
    <div className="p-0">
      <h2 className="text-xl font-bold bg-yellow-300 text-center h-[50px] flex justify-center items-center">Conversation Transcript</h2>
      <div className="mt-4 bg-white p-4 rounded shadow-lg h-96 overflow-y-scroll">
        {transcriptData.map((entry) => (
          <div
            key={entry.id}
            className={`relative my-2 p-2 border ${selectedEntryId === entry.id ? 'border-yellow-500 bg-yellow-100' : 'border-gray-300'}`}
            onClick={() => onSelectEntry(entry.id)}
          >
            <p className="font-bold">{entry.speaker}:</p>
            <p>{entry.text}</p>
            {comments[entry.id]?.map((comment, index) => (
              <div key={index} className="mt-2 p-2 border-t border-gray-200">
                <p>{comment.text}</p>
                {comment.imageUrl && (
                  <div className="mt-2">
                    <img src={comment.imageUrl} alt="Comment" className="w-32 h-32" />
                  </div>
                )}
              </div>
            ))}
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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2 mb-2"
          />
          <button
            className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={handleAddCommentClick}
          >
            Add Comment
          </button>
          {imageUrl && <p>Selected image: <img src={imageUrl} alt="Selected" className="w-32 h-32" /></p>}
        </div>
      )}
    </div>
  );
};

export default TranscriptViewer;
