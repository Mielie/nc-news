import { useLocation, Link } from "react-router-dom";
import ArticleList from "./ArticleList";

const Header = () => {
	const { pathname: path } = useLocation();

	const articleView = /\/articles\/[0-9]+/i.test(path);

	return (
		<header>
			<div id="headerContainer">
				<h1 id="titleText">NCNews</h1>
				<button id="loginButton" className="brandedButton">
					Login
				</button>
			</div>
			<div>
				<div id="filterBackBar">
					{articleView ? (
						<Link id="backToArticles" to="/">
							← Articles
						</Link>
					) : (
						<p></p>
					)}
				</div>
				<div id="sortBar"></div>
			</div>
		</header>
	);
};

export default Header;
