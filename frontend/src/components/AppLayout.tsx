import React, { useState } from 'react';
import TranscriptViewer from './TranscriptViewer';
import CommentSidebar from './CommentSidebar';
import CommentBox from './CommentBox';
import SummarySection from './SummarySection';

const AppLayout: React.FC = () => {
  const [selectedEntryId, setSelectedEntryId] = useState<number | null>(null);
  const [comments, setComments] = useState<{ [key: number]: { text: string; imageUrl?: string }[] }>({});
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(null);

  const handleSelectEntry = (id: number) => {
    setSelectedEntryId(id);
    setEditingCommentIndex(null);
  };

  const handleAddComment = (newComment: string, imageUrl?: string) => {
    if (selectedEntryId !== null) {
      setComments((prev) => ({
        ...prev,
        [selectedEntryId]: [...(prev[selectedEntryId] || []), { text: newComment, imageUrl }],
      }));
    }
  };

  const handleSaveComment = (id: number, text: string, imageUrl?: string) => {
    if (id !== null && editingCommentIndex !== null) {
      setComments((prev) => ({
        ...prev,
        [id]: prev[id].map((comment, index) =>
          index === editingCommentIndex ? { text, imageUrl } : comment
        ),
      }));
      setEditingCommentIndex(null);
    }
  };

  const handleDeleteComment = () => {
    if (selectedEntryId !== null && editingCommentIndex !== null) {
      setComments((prev) => ({
        ...prev,
        [selectedEntryId]: prev[selectedEntryId].filter(
          (_, index) => index !== editingCommentIndex
        ),
      }));
      setEditingCommentIndex(null);
    }
  };

  const handleCancel = () => {
    setEditingCommentIndex(null);
  };

  const handleUploadImage = (image: File) => {
    // Handle the image upload logic
  };

  return (
    <div className="flex p-8 bg-gray-200 min-h-screen">
      <div className="flex flex-col w-full">
        <TranscriptViewer
          selectedEntryId={selectedEntryId}
          onSelectEntry={handleSelectEntry}
          onAddComment={handleAddComment}
          comments={comments}
          onEditComment={(index) => setEditingCommentIndex(index)}
          onSaveComment={handleSaveComment}
          onCancel={handleCancel}
          onUploadImage={handleUploadImage} // Pass the handler
        />
        <SummarySection />
      </div>
      <div className="flex flex-col w-1/4">
        <CommentSidebar
          selectedEntryId={selectedEntryId}
          comments={comments}
          onEditComment={(index) => setEditingCommentIndex(index)}
          onDeleteComment={handleDeleteComment}
          onSaveComment={handleSaveComment}
          onCancel={handleCancel}
        />
        {selectedEntryId !== null && editingCommentIndex !== null && (
          <CommentBox
            initialText={comments[selectedEntryId][editingCommentIndex]?.text || ''}
            onSave={(text, imageUrl) => handleSaveComment(selectedEntryId, text, imageUrl)}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default AppLayout;
