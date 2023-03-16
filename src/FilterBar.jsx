import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { getTopicList } from "./apiFunctions";
import { capitaliseFirstLetter } from "./utils";
import SortBar from "./SortBar";

const FilterBar = ({
	topicFilter,
	setTopicFilter,
	authorFilter,
	setAuthorFilter,
	authorValue,
	setAuthorValue,
}) => {
	const { pathname: path } = useLocation();
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();
	const articleView = /\/articles\/[0-9]+/i.test(path);
	const loginView = path === "/login";

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

	return (
		<div
			id={articleView || loginView ? "filterBackBar1" : "filterBackBar2"}
		>
			{articleView || loginView ? (
				<Link id="backToArticles" to="/">
					← Articles
				</Link>
			) : (
				<div id="topicFilter">
					<label id="filterLabel" htmlFor="topicSelector">
						Filter articles
					</label>
					<select
						id="topicSelector"
						name="topicFilter"
						disabled={isLoading}
						value={topicFilter}
						onChange={(event) => setTopicFilter(event.target.value)}
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
				</div>
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
			{!articleView && !loginView && <SortBar />}
		</div>
	);
};

export default FilterBar;
