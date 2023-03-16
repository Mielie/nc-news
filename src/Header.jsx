import { useLocation, useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { getTopicList } from "./apiFunctions";

const Header = ({ topicFilter, setTopicFilter }) => {
	const { pathname: path } = useLocation();
	const navigate = useNavigate();
	const articleView = /\/articles\/[0-9]+/i.test(path);
	const loginView = path === "/login";
	const { user, setUser } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	const [topicList, setTopicList] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		getTopicList().then((topics) => {
			console.log(topics);
			setTopicList(topics);
			setIsLoading(false);
		});
	}, []);

	return (
		<header>
			<div id="headerContainer">
				<h1 id="titleText">NCNews</h1>
				{user ? (
					<a
						id="loginAvatarContainer"
						onClick={() => navigate("/login")}
					>
						<img
							id="loggedInAvatar"
							className="brandedButton"
							src={user.avatar_url}
						/>
					</a>
				) : (
					<button
						id="loginButton"
						className="brandedButton"
						onClick={() => navigate("/login")}
					>
						Login
					</button>
				)}
			</div>
			<div>
				<div id="filterBackBar">
					{articleView || loginView ? (
						<Link id="backToArticles" to="/">
							← Articles
						</Link>
					) : (
						<select
							id="topicFilter"
							name="topicFilter"
							disabled={isLoading}
							value={topicFilter}
							onChange={(event) =>
								setTopicFilter(event.target.value)
							}
						>
							<option value="">All topics</option>
							{topicList.map((topic) => {
								return (
									<option key={topic.slug} value={topic.slug}>
										{topic.slug}
									</option>
								);
							})}
						</select>
					)}
					{loginView && user ? (
						<button
							id="logoutButton"
							onClick={() => {
								setUser(null);
								navigate(-1);
							}}
						>
							Logout
						</button>
					) : null}
				</div>
				<div id="sortBar"></div>
			</div>
		</header>
	);
};

export default Header;
