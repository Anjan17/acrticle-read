import React, { useState } from "react";
import { Textarea, Button } from "react-rainbow-components";

const CommentBox = ({
  onSubmit,
  enableCancel = false,
  onCancelComment = () => {},
}) => {
  const [comment, setComment] = useState("");

  const onChangeText = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleCommentSubmit = () => {
    onSubmit(comment);
    setComment("");
  };

  return (
    <div className="comment-box">
      <Textarea
        id="example-textarea-1"
        rows={4}
        placeholder="Enter comment"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
        onChange={onChangeText}
        value={comment}
      />
      <Button
        className="comment-button"
        label="Post Comment"
        disabled={!comment.length}
        onClick={handleCommentSubmit}
      />
      {enableCancel && (
        <Button
          className="comment-button"
          label="Cancel"
          onClick={onCancelComment}
        />
      )}
    </div>
  );
};

export default CommentBox;
