import React, { useEffect, useState } from "react";
import { Input, Select } from "react-rainbow-components";
import { Page } from "../../common-components";
import ArticleList from "./ArticleList";

const selectOptions = [
  {
    value: "Alphabetically",
    label: "Alphabetically",
  },
  {
    value: "Newest to Oldest",
    label: "Newest to Oldest",
  },
  {
    value: "Oldest to Newest",
    label: "Oldest to Newest",
  },
];
const ArticlesPage = () => {
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
    setFilteredArticles(getFilteredArticles({ articles, searchValue: value }));
  };

  const getFilteredArticles = ({ articles = [], searchValue = "" }) => {
    const searchValueLowerCase = searchValue.toLowerCase();
    const filteredArticles = articles.filter(({ title = "" }) =>
      title.toLowerCase().includes(searchValueLowerCase)
    );
    return filteredArticles;
  };

  const sortArticles = (sortOrder, articles) => {
    if (sortOrder === "Alphabetically") {
      const sortedArticles = articles.sort((item1, item2) => {
        if (item1.title < item2.title) return -1;
        if (item1.title > item2.title) return 1;
        return 0;
      });
      setArticles(sortedArticles);
      setFilteredArticles(
        getFilteredArticles({
          articles: sortedArticles,
          searchValue: searchText,
        })
      );
    }
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
        <Select
          label="Select Label"
          options={selectOptions}
          id="example-select-1"
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          onChange={(e) => {
            const { value } = e.target;
            sortArticles(value, articles);
          }}
        />
      </div>
      <div className="articles-content">
        <ArticleList articles={filteredArticles} searchText={searchText} />
      </div>
    </Page>
  );
};

export default ArticlesPage;
