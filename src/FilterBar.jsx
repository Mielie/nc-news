import {
	useLocation,
	useNavigate,
	useSearchParams,
	Link,
} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { getTopicList } from "./apiFunctions";
import { capitaliseFirstLetter } from "./utils";
import SortBar from "./SortBar";

const FilterBar = () => {
	const { pathname: path } = useLocation();
	const { user, setUser } = useContext(UserContext);

	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(true);
	const [topicList, setTopicList] = useState([]);
	const [buttonDisable, setButtonDisable] = useState(true);
	const [buttonClear, setButtonClear] = useState(false);
	const [topicValue, setTopicValue] = useState("");
	const [authorValue, setAuthorValue] = useState("");

	const navigate = useNavigate();
	const articleView = /\/articles\/[0-9]+/i.test(path);
	const loginView = path === "/login";
	const newParams = Object.fromEntries([...searchParams]);

	useEffect(() => {
		setIsLoading(true);
		getTopicList().then((topics) => {
			setTopicList((currentTopics) => {
				const topicURL = searchParams.get("topic") || "";
				if (
					topicURL &&
					!topics.find((topic) => topic.slug === topicURL)
				) {
					return [{ slug: topicURL }, ...topics];
				}
				return topics;
			});
			setIsLoading(false);
		});
	}, [topicValue]);

	useEffect(() => {
		const newAuthorValue = searchParams.get("author") || "";
		setAuthorValue(newAuthorValue);
		if (newAuthorValue) {
			setClearButton();
		}
		const newTopic = searchParams.get("topic") || "";
		setTopicValue(newTopic);
	}, [searchParams]);

	const authorChanged = (event) => {
		const currentValue = event.target.value;
		if (currentValue !== "") {
			currentValue === newParams.author
				? setClearButton()
				: setSearchButton(false);
		} else if (newParams.author) {
			setClearButton();
		} else {
			setButtonDisable(true);
		}
		setAuthorValue(currentValue);
	};

	const searchAuthor = (event) => {
		event.preventDefault();
		if (authorValue) {
			newParams.author = authorValue;
		} else {
			delete newParams.author;
		}
		setSearchParams(newParams);
	};

	const updateTopicFilter = (event) => {
		const currentValue = event.target.value;
		if (currentValue) {
			newParams.topic = event.target.value;
		} else {
			delete newParams.topic;
		}
		setSearchParams(newParams);
	};

	const actionSearchClear = (event) => {
		if (buttonClear) {
			event.preventDefault();
			delete newParams.author;
			setSearchParams(newParams);
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
						value={topicValue}
						onChange={updateTopicFilter}
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
						autoComplete="off"
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
