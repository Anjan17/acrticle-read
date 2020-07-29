import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../../auth";
import { guid } from "../../utils";
import { Page, CommentList } from "../../common-components";

const ArticleDetail = () => {
  const [articleData, setArticleData] = useState({});
  const [authorData, setAuthorData] = useState({});
  const { pathname } = useLocation();
  const { authTokens } = useAuth();
  const id = pathname.split("/")[2];
  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const articleDetails = await fetch(
          `http://localhost:3000/articles/${id}`
        );
        const articleData = await articleDetails.json();
        setArticleData(articleData);
        const userDetails = await fetch(
          `http://localhost:3000/users/${articleData.userId}`
        );
        const userData = await userDetails.json();
        if (userData && userData.id) setAuthorData(userData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchArticleDetails();
  }, []);

  const getCommentPayload = (text) => {
    return {
      id: guid(),
      text,
      author: authTokens.userName,
      replies: []
    };
  };

  const exploreComment = (currentComment, comment) => {
    let updatedComment =
      currentComment.id === comment.id
        ? { ...currentComment, ...comment }
        : { ...currentComment };
    let updatedReplies = [];
    const { replies } = updatedComment;
    if (replies.length) {
      updatedReplies = replies.map((reply) => exploreComment(reply, comment));
      return { ...updatedComment, replies: updatedReplies };
    }
    return updatedComment;
  };

  const getUpdatedComments = (comments, comment) => {
    const updatedComments = comments.map((currentComment) =>
      exploreComment(currentComment, comment)
    );
    return updatedComments;
  };

  const onSubmitComment = async (commentText) => {
    try {
      const updatedCommentWithID = getCommentPayload(commentText);
      const { comments, ...rest } = articleData;
      const payload = {
        ...rest,
        comments: [...comments, updatedCommentWithID],
      };
      const response = await fetch(`http://localhost:3000/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setArticleData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateComment = (editedComment) => {
    const { comments } = articleData;
    const updatedComments = getUpdatedComments(comments, editedComment);
    updateFinalComments(updatedComments);
  };

  const updateFinalComments = async (commentsUpdated) => {
    try {
      // const updatedCommentWithID = getCommentPayload(commentText);
      console.log(commentsUpdated);
      const { comments, ...rest } = articleData;
      const payload = {
        ...rest,
        comments: commentsUpdated,
      };
      const response = await fetch(`http://localhost:3000/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setArticleData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const { title, body, comments } = articleData;
  return (
    <Page>
      <Link to="/articles">Go back to All Articles</Link>
      <div className="article-content">
        <h3>{`#${id}`}</h3>
        <div className="author-publish">{`Posted by ${authorData.userName}`}</div>
        <h4 className="article-title">{title}</h4>
        <div className="article-body">{body}</div>
      </div>
      <CommentList
        comments={comments}
        onSubmitComment={onSubmitComment}
        onUpdateComment={onUpdateComment}
        article={articleData}
      />
    </Page>
  );
};

export default ArticleDetail;
