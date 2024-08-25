import React from 'react';

interface CommentSidebarProps {
  selectedEntryId: number | null;
  comments: { [key: number]: string[] };
  onEditComment: (index: number) => void;
  onDeleteComment: () => void;
  onSaveComment: (text: string) => void;
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
  return (
    <div className="w-full p-4 bg-black h-screen overflow-y-auto">
      <h2 className="text-xl font-bold text-center text-white">Comments</h2>
      <div className="mt-4">
        {selectedEntryId !== null && comments[selectedEntryId] ? (
          comments[selectedEntryId].map((comment, index) => (
            <div key={index} className="p-4 mb-4 bg-white rounded-lg shadow-md">
              <p className="text-lg">{comment}</p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full text-sm"
                  onClick={() => onEditComment(index)}
                >
                  <i className="fas fa-pencil-alt" /> Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded-full text-sm ml-2"
                  onClick={onDeleteComment}
                >
                  <i className="fas fa-trash-alt" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No comments for this entry.</p>

        )}
      </div>
    </div>
  );
};

export default CommentSidebar;