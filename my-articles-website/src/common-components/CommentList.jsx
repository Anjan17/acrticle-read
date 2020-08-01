import React from "react";
import Comment from "./Comment";
import CommentBox from "./CommentBox";

const CommentList = ({ comments = [], onSubmitComment, onUpdateComment }) => {
  return (
    <div className="comment-list">
      <h4 className="comments-text">Comments</h4>
      {comments.map((comment) => (
        <Comment
          comment={comment}
          key={comment.id}
          onUpdateComment={onUpdateComment}
          onSubmit={onSubmitComment}
        />
      ))}
      <CommentBox onSubmit={onSubmitComment} />
    </div>
  );
};

export default CommentList;
