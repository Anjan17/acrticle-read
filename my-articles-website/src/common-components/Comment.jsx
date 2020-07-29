import React, { useState, useCallback, useEffect } from "react";
import { Textarea } from "react-rainbow-components";
import { useAuth } from "../auth";

const Comment = ({ comment, onUpdateComment = () => {} }) => {
  const { id, text, replies, author } = comment;
  const [editMode, setEditMode] = useState(false);
  const [commentText, setCommentText] = useState("");

  // onUpdateComment = (
  //   article,
  //   commentContainingEdit,
  //   commentText,
  //   id,
  //   updateFinalComments
  // ) => {
  //   const isCommentPresentInFirstTier = article.comments.findIndex(
  //     (comment) => comment.id === commentContainingEdit.id
  //   );
  //   if (isCommentPresentInFirstTier === -1) {
  //     const isCommentPresentInReplies = commentContainingEdit.replies.findIndex(
  //       (reply) => reply.id === id
  //     );
  //     if (isCommentPresentInReplies === -1) {
  //       onUpdateComment(article, commentContainingEdit, commentText, id);
  //     } else {
  //       // update the replies in the parent component and return
  //       const updatedReplies = commentContainingEdit.replies.map((reply) =>
  //         reply.id === id ? { ...reply, text: commentText } : reply
  //       );
  //       const updatedComment = {
  //         ...commentContainingEdit,
  //         replies: updatedReplies,
  //       };
  //       onUpdateComment(article, updatedComment, commentText, id);
  //     }
  //   } else {
  //     // update the comments of the article
  //     const updatedComments = article.comments.map((comment) =>
  //       comment.id === id ? { ...comment, text: commentText } : comment
  //     );
  //     return updateFinalComments(updatedComments);
  //   }
  // };

  useEffect(() => {
    setCommentText(text);
  }, [text, id]);

  const { authTokens } = useAuth();
  const editComment = useCallback(() => setEditMode(true), []);
  const saveComment = (editedComment) => {
    setEditMode(false);
    onUpdateComment(editedComment);
  };

  if (!id) return null;
  return (
    <div className="comment">
      {!editMode ? (
        <div className="text">{text}</div>
      ) : (
        <Textarea
          id="example-textarea-1"
          rows={4}
          placeholder="Enter comment"
          onChange={(e) => {
            const { value } = e.target;
            setCommentText(value);
          }}
          value={commentText}
        />
      )}
      <div className="subtitle">
        {author && (
          <div className="author">{`Posted by ${
            authTokens.userName !== author ? author : "you"
          }`}</div>
        )}
        {!editMode && <div className="reply-comment">Reply</div>}
        {authTokens.userName === author && (
          <div
            className="edit-comment"
            onClick={(e) =>
              editMode
                ? saveComment({ ...comment, text: commentText })
                : editComment()
            }
          >
            {editMode ? "Save" : "Edit"}
          </div>
        )}
      </div>
      {replies && replies.length
        ? replies.map((reply) => (
            <Comment
              comment={reply}
              key={reply.id}
              onUpdateComment={onUpdateComment}
            />
          ))
        : null}
    </div>
  );
};

export default Comment;
