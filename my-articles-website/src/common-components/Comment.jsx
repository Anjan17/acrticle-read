import React, { useState, useCallback, useEffect } from "react";
import { Textarea } from "react-rainbow-components";
import { useAuth } from "../auth";
import CommentBox from "./CommentBox";

const Comment = ({
  comment,
  onUpdateComment = () => {},
  onSubmit = () => {},
}) => {
  const { id, text, replies, author } = comment;
  const [editMode, setEditMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setCommentText(text);
  }, [text, id]);

  const { authTokens } = useAuth();
  const editComment = useCallback(() => setEditMode(true), []);
  const saveComment = (editedComment) => {
    setEditMode(false);
    onUpdateComment(editedComment);
  };

  const onReplyComment = useCallback(() => setReplyMode(true), []);
  const onCancelComment = () => {
    setEditMode(false);
    setReplyMode(false);
  };
  const onSubmitComment = (replyText) => {
    setReplyMode(false);
    onSubmit(replyText, comment);
  };

  if (!id) return null;
  return (
    <div className="comment">
      <div className="comment-body">
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
          {!editMode && (
            <div className="reply-comment" onClick={onReplyComment}>
              Reply
            </div>
          )}
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
      </div>
      <div className="reply-section">
        {replyMode && (
          <CommentBox
            onSubmit={onSubmitComment}
            enableCancel
            onCancelComment={onCancelComment}
          />
        )}
        {replies && replies.length
          ? replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                onUpdateComment={onUpdateComment}
                onSubmit={onSubmit}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Comment;
