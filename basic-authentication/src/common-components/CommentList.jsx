import React from "react";
import Comment from "./Comment";
import CommentBox from "./CommentBox";

const CommentList = ({
  comments = ["This is a sample comment", "This is another comment"],
  onSubmitComment,
}) => (
  <div className="comment-list">
    <h4 className="comments-text">Comments</h4>
    {comments.map((comment, idx) => (
      <Comment
        comment={comment}
        key={`${comment.slice(2, comment.length)}-${idx}`}
      />
    ))}
    <CommentBox onSubmit={onSubmitComment} />
  </div>
);

export default CommentList;
