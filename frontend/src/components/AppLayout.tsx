import React, { useState } from 'react';
import TranscriptViewer from './TranscriptViewer';
import SummarySection from './SummarySection';
import CommentSidebar from './CommentSidebar';
import CommentBox from './CommentBox';

const AppLayout: React.FC = () => {
  const [selectedEntryId, setSelectedEntryId] = useState<number | null>(null);
  const [comments, setComments] = useState<{ [key: number]: string[] }>({});
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(null);

  const handleSelectEntry = (id: number) => {
    setSelectedEntryId(id);
    setEditingCommentIndex(null);
  };

  const handleAddComment = (newComment: string) => {
    if (selectedEntryId !== null) {
      setComments(prev => ({
        ...prev,
        [selectedEntryId]: [...(prev[selectedEntryId] || []), newComment],
      }));
    }
  };

  const handleSaveComment = (text: string) => {
    if (selectedEntryId !== null && editingCommentIndex !== null) {
      setComments(prev => ({
        ...prev,
        [selectedEntryId]: prev[selectedEntryId].map((comment, index) =>
          index === editingCommentIndex ? text : comment
        ),
      }));
    }
    setEditingCommentIndex(null);
  };

  const handleDeleteComment = () => {
    if (selectedEntryId !== null && editingCommentIndex !== null) {
      setComments(prev => ({
        ...prev,
        [selectedEntryId]: prev[selectedEntryId].filter((_, index) => index !== editingCommentIndex),
      }));
    }
    setEditingCommentIndex(null);
  };

  const handleCancel = () => {
    setEditingCommentIndex(null);
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
            initialText={comments[selectedEntryId][editingCommentIndex]}
            onSave={handleSaveComment}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default AppLayout;
