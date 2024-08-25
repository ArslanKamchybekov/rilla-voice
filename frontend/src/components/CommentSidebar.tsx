import React, { useState } from 'react';

interface CommentSidebarProps {
  selectedEntryId: number | null;
  comments: { [key: number]: { text: string; imageUrl?: string }[] };
  onEditComment: (index: number) => void;
  onDeleteComment: () => void;
  onSaveComment: (id: number, text: string, imageUrl: string | undefined) => void;
  onCancel: () => void;
}

const CommentSidebar: React.FC<CommentSidebarProps> = ({
  selectedEntryId,
  comments,
  onEditComment,
  onDeleteComment,
  onSaveComment,
  onCancel
}) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowImage = (imageUrl: string | undefined) => {
    if (imageUrl) {
      setSelectedImageUrl(imageUrl);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImageUrl(null);
  };

  return (
    
    <div className="w-full p-4 bg-black h-screen overflow-y-auto">
      <h2 className="text-xl font-bold text-center text-white">Comments</h2>
      <div className="mt-4">
        {selectedEntryId !== null && comments[selectedEntryId] ? (
          comments[selectedEntryId].map((comment, index) => (
            <div key={index} className="p-4 mb-4 bg-white rounded-lg shadow-md">
              <p className="text-lg">{comment.text}</p>
              <div className="flex justify-center mt-4 space-x-2">
                {comment.imageUrl && (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-sm text-sm"
                    onClick={() => handleShowImage(comment.imageUrl)}
                  >
                    View Image
                  </button>
                )}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-sm text-sm"
                  onClick={() => onEditComment(index)} 
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-sm text-sm"
                  onClick={onDeleteComment}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No comments for this entry.</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-lg relative">
            <button
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
              onClick={handleCloseModal}
            >
              Close
            </button>
            {selectedImageUrl && (
              <img src={selectedImageUrl} alt="Comment" className="max-w-full max-h-screen" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSidebar;
