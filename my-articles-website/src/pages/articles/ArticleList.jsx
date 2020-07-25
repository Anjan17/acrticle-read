import React from "react";
import { useHistory } from "react-router-dom";
import ArticleItem from "./ArticleItem";

const ArticleList = ({ articles = [], searchText = "" }) => {
  const history = useHistory();

  const onClickArticleItem = (id) => {
    history.push(`/articles/${id}`);
  };
  return (
    <div className="article-list">
      {articles.map(({ id, title }) =>
        id ? (
          <ArticleItem
            id={id}
            key={id}
            title={title}
            onClick={() => onClickArticleItem(id)}
            searchText={searchText}
          />
        ) : null
      )}
    </div>
  );
};

export default React.memo(ArticleList);
