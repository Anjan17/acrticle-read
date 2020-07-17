import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "react-rainbow-components";
import { Page } from "../common-components";
import ArticleList from "./ArticleList";

const ArticlesPage = () => {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch("http://localhost:3000/articles");
      const data = await response.json();
      setArticles(data);
      setFilteredArticles(data);
    };
    try {
      getArticles();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const changeSearchText = (e) => {
    const { value } = e.target;
    setSearchText(value);
    getFilteredArticles(value);
  };

  const getFilteredArticles = (searchValue = "") => {
    const searchValueLowerCase = searchValue.toLowerCase();
    const filteredArticles = articles.filter(({ title = "" }) =>
      title.toLowerCase().includes(searchValueLowerCase)
    );
    setFilteredArticles(filteredArticles);
  };

  return (
    <Page className="articles">
      <div className="articles-header">
        <h1>All Articles</h1>
        <Input
          className="article-header--search"
          placeholder="Search for an article title"
          onChange={changeSearchText}
          value={searchText}
        />
      </div>
      <div className="articles-content">
        <ArticleList articles={filteredArticles} />
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
