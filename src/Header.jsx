import { useLocation, useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { getTopicList } from "./apiFunctions";
import { capitaliseFirstLetter } from "./utils";

const Header = ({
	topicFilter,
	setTopicFilter,
	setAuthorFilter,
	authorValue,
	setAuthorValue,
	authorFilter,
	sortBy,
	setSortBy,
	sortUp,
	setSortUp,
}) => {
	const { pathname: path } = useLocation();
	const navigate = useNavigate();
	const articleView = /\/articles\/[0-9]+/i.test(path);
	const loginView = path === "/login";
	const { user, setUser } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	const [topicList, setTopicList] = useState([]);
	const [buttonDisable, setButtonDisable] = useState(true);
	const [buttonClear, setButtonClear] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getTopicList().then((topics) => {
			setTopicList(topics);
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		if (authorFilter !== "") {
			setClearButton();
		}
	}, [authorFilter]);

	const authorChanged = (event) => {
		const currentValue = event.target.value;
		if (currentValue !== "") {
			currentValue === authorFilter
				? setClearButton()
				: setSearchButton(false);
		} else {
			setButtonDisable(true);
		}
		setAuthorValue(currentValue);
	};

	const searchAuthor = (event) => {
		event.preventDefault();
		if (authorValue !== "") {
			setAuthorFilter(authorValue);
			setClearButton();
		}
	};

	const actionSearchClear = (event) => {
		if (buttonClear) {
			event.preventDefault();
			setAuthorFilter("");
			setAuthorValue("");
			setSearchButton();
		}
	};

	const setSearchButton = (disabled = true) => {
		setButtonDisable(disabled);
		setButtonClear(false);
	};

	const setClearButton = () => {
		setButtonClear(true);
		setButtonDisable(false);
	};

	const updateSortBy = (event) => {
		const currentValue = event.target.value;
		setSortBy(currentValue ? currentValue : undefined);
	};

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
										{capitaliseFirstLetter(topic.slug)}
									</option>
								);
							})}
						</select>
					)}
					{!articleView && !loginView && (
						<form id="authorSearchForm" onSubmit={searchAuthor}>
							<input
								type="text"
								id="authorSearchField"
								placeholder="All authors"
								value={authorValue}
								onChange={authorChanged}
							/>
							<button
								id="authorFilterButton"
								className="brandedButton"
								disabled={buttonDisable}
								onClick={actionSearchClear}
							>
								{buttonClear ? "Clear" : "Search"}
							</button>
						</form>
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
				{!articleView && !loginView && (
					<div id="sortBar">
						<label id="sortLabel" htmlFor="sortSelector">
							Sort articles
						</label>
						<select
							id="sortSelector"
							value={sortBy}
							onChange={updateSortBy}
						>
							<option value="">Date</option>
							<option value="comment_count">Comment Count</option>
							<option value="votes">Votes</option>
						</select>
						<button
							id="sortButton"
							className="brandedButton"
							onClick={() => {
								setSortUp(!sortUp);
							}}
						>
							{sortUp ? "ᐱ" : "ᐯ"}
						</button>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
