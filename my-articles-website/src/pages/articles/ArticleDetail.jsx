import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Page, CommentList } from "../../common-components";

const ArticleDetail = () => {
  const [articleData, setArticleData] = useState({});
  const [authorData, setAuthorData] = useState({});
  const { pathname } = useLocation();
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

  const onSubmitComment = async (comment) => {
    try {
      const { comments, ...rest } = articleData;
      const payload = { ...rest, comments: [...comments, comment] };
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
      <CommentList comments={comments} onSubmitComment={onSubmitComment} />
    </Page>
  );
};

export default ArticleDetail;
