import React from "react";

const highlightText = (value = "", textToHighlight = "") => {
  const indexOfMatch = value
    .toLowerCase()
    .indexOf(textToHighlight.toLowerCase());
  const highlightSize = textToHighlight.length;
  if (indexOfMatch > -1 && highlightSize) {
    const highlightedText = (
      <span>
        {value.substring(0, indexOfMatch)}
        <b>{value.substring(indexOfMatch, indexOfMatch + highlightSize)}</b>
        {value.substring(indexOfMatch + highlightSize)}
      </span>
    );
    return highlightedText;
  }

  return <span>{value}</span>;
};

const ArticleItem = ({ id, title, onClick, searchText }) => (
  <div className="article-item" onClick={onClick}>
    <div className="article-details-id">{`#${id}`}</div>
    <div className="article-details-title">
      {highlightText(title, searchText)}
    </div>
  </div>
);

export default ArticleItem;
