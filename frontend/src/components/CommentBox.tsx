import React, { useState } from 'react';

type CommentBoxProps = {
  initialText: string;
  onSave: (text: string, imageUrl?: string) => void;
  onCancel: () => void;
};

const CommentBox: React.FC<CommentBoxProps> = ({ initialText, onSave, onCancel }) => {
  const [text, setText] = useState(initialText);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const handleSave = () => {
    onSave(text, imageUrl);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setImageUrl(url);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-300 rounded shadow-md">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Edit your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mt-2"
      />
      <button
        className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="mt-2 bg-gray-500 text-white px-4 py-2 rounded ml-2"
        onClick={onCancel}
      >
        Cancel
      </button>
      {imageUrl && (
        <div className="mt-2">
          <p>Image Preview:</p>
          <img src={imageUrl} alt="Preview" className="w-32 h-32 mt-2" />
        </div>
      )}
    </div>
  );
};

export default CommentBox;
