import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import ArticleList from "./ArticleList";
import Article from "./Article";
import { useState } from "react";

function App() {
  const [numItems, setNumItems] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [commentPageNumber, setCommentPageNumber] = useState(1);
  const [articlePerPage, setArticlePerPage] = useState(10);
  const [articleWordCount, setArticleWordCount] = useState(null);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ArticleList setNumItems={setNumItems} pageNumber={pageNumber} />
          }
        />
        <Route
          path="/articles/:articleid"
          element={
            <Article
              setArticleWordCount={setArticleWordCount}
              setNumItems={setNumItems}
              setCommentPageNumber={setCommentPageNumber}
              commentPageNumber={commentPageNumber}
            />
          }
        />
      </Routes>
      <Footer
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        commentPageNumber={commentPageNumber}
        setCommentPageNumber={setCommentPageNumber}
        numItems={numItems}
        articlesPerPage={articlePerPage}
        articleWordCount={articleWordCount}
      />
    </div>
  );
}

export default App;
