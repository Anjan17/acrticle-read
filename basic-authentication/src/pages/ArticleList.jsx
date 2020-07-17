import React from "react";
import { useHistory } from "react-router-dom";
import { Article } from "./Articles";

const ArticleList = ({ articles }) => {
  const history = useHistory();

  const onClickArticleItem = (id) => {
    history.push(`/articles/${id}`);
  };
  return (
    <div className="article-list">
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
  );
};

export default React.memo(ArticleList);
