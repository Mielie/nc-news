import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import ArticleList from "./ArticleList";
import { useState } from "react";

function App() {
  const [numArticles, setNumArticles] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [articlePerPage, setArticlePerPage] = useState(10);
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
      </Routes>
      <Footer
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        numArticles={numArticles}
        articlesPerPage={articlePerPage}
      />
    </div>
  );
}

export default App;
