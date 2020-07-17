import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Page } from "../components";
import { Input } from "react-rainbow-components";

const ArticlesPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch("http://localhost:3000/articles");
      const data = await response.json();
      setArticles(data);
    };
    try {
      getArticles();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onClickArticleItem = (id) => {
    history.push(`/articles/${id}`);
  };
  return (
    <Page className="articles">
      <div className="articles-header">
        <h1>All Articles</h1>
        <Input
          className="article-header--search"
          placeholder="Search for an article title"
        />
      </div>
      <div className="articles-content">
        {articles.map(({ id, title }) =>
          id ? (
            <Article
              id={id}
              key={id}
              title={title}
              onClick={() => onClickArticleItem(id)}
            />
          ) : null
        )}
      </div>
    </Page>
  );
};

const Article = ({ id, title, onClick }) => (
  <div className="article-item" onClick={onClick}>
    <div className="article-details-id">{`#${id}`}</div>
    <div className="article-details-title">{title}</div>
  </div>
);
export { ArticlesPage, Article };
