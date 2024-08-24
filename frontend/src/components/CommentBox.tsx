import React, { useState } from 'react';

interface CommentBoxProps {
  initialText?: string;
  onSave: (text: string) => void;
  onCancel: () => void;
  onDelete?: () => void;
  onEdit?: (text: string) => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({
  initialText = '',
  onSave,
  onCancel,
  onDelete,
  onEdit
}) => {
  const [text, setText] = useState(initialText);

  const handleSave = () => {
    if (onSave) onSave(text);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(text);
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <textarea
        className="w-full p-2 border rounded-lg mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
      />
      <div className="flex justify-end">
        {onEdit && (
          <button
            className="bg-blue-500 text-white p-2 rounded-lg mr-2"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
        <button
          className="bg-yellow-500 text-white p-2 rounded-lg mr-2"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded-lg mr-2"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className="bg-gray-300 text-black p-2 rounded-lg" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
