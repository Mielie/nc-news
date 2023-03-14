import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import ArticleList from "./ArticleList";
import Article from "./Article";
import { useState } from "react";

function App() {
  const [numArticles, setNumArticles] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [articlePerPage, setArticlePerPage] = useState(10);
  const [articleWordCount, setArticleWordCount] = useState(null);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ArticleList
              setNumArticles={setNumArticles}
              pageNumber={pageNumber}
            />
          }
        />
        <Route
          path="/articles/:articleid"
          element={<Article setArticleWordCount={setArticleWordCount} />}
        />
      </Routes>
      <Footer
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        numArticles={numArticles}
        articlesPerPage={articlePerPage}
        articleWordCount={articleWordCount}
      />
    </div>
  );
}

export default App;
