import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import ArticleList from "./ArticleList";
import Article from "./Article";
import Login from "./Login";
import { useState, useEffect } from "react";
import InvalidPath from "./InvalidPath";

function App() {
  const [numItems, setNumItems] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [commentPageNumber, setCommentPageNumber] = useState(1);
  const [articlePerPage, setArticlePerPage] = useState(10);
  const [articleWordCount, setArticleWordCount] = useState(null);
  const [topicFilter, setTopicFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [authorValue, setAuthorValue] = useState("");

  useEffect(() => {
    document.title = "NCNews";
  }, []);

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
        <Route path="/login" element={<Login setNumItems={setNumItems} />} />
        <Route path="*" element={<InvalidPath />} />
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
