import React, { useState } from "react";
import CommentSidebar from "./CommentSidebar";
import TranscriptViewer from "./TranscriptViewer";
import SummarySection from "./SummarySection";
import CommentBox from "./CommentBox";

const AppLayout: React.FC = () => {
  const [selectedEntryId, setSelectedEntryId] = useState<number | null>(null);
  const [comments, setComments] = useState<{
    [key: number]: { text: string; imageUrl?: string }[];
  }>({});
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(
    null
  );

  const handleSelectEntry = (id: number) => {
    setSelectedEntryId(id);
    setEditingCommentIndex(null);
  };

  const handleAddComment = (newComment: string, imageUrl?: string) => {
    if (selectedEntryId !== null) {
      setComments((prev) => ({
        ...prev,
        [selectedEntryId]: [
          ...(prev[selectedEntryId] || []),
          { text: newComment, imageUrl },
        ],
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

  const handleEditComment = (index: number) => {
    setEditingCommentIndex(index);
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
    <div className="flex flex-col lg:flex-row lg:space-x-8 p-4 lg:p-8 bg-gray-200 min-h-screen">
      <div className="flex flex-col w-full lg:w-3/4 space-y-4">
        <TranscriptViewer
          selectedEntryId={selectedEntryId}
          onSelectEntry={handleSelectEntry}
          onAddComment={handleAddComment}
          comments={comments}
          onEditComment={handleEditComment}
          onSaveComment={handleSaveComment}
          onCancel={handleCancel}
          onUploadImage={handleUploadImage}
        />
        <SummarySection comments={comments} selectedEntryId={selectedEntryId} />
      </div>
      <div className="flex flex-col w-full lg:w-1/4 space-y-4">
        <CommentSidebar
          selectedEntryId={selectedEntryId}
          comments={comments}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
          onSaveComment={handleSaveComment}
          onCancel={handleCancel}
        />
        {editingCommentIndex !== null && selectedEntryId !== null && (
          <CommentBox
            initialText={
              comments[selectedEntryId][editingCommentIndex]?.text || ""
            }
            onSave={(text, imageUrl) =>
              handleSaveComment(selectedEntryId, text, imageUrl)
            }
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default AppLayout;
