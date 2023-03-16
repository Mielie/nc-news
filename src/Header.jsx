import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import FilterBar from "./FilterBar";

const Header = ({
	topicFilter,
	setTopicFilter,
	setAuthorFilter,
	authorValue,
	setAuthorValue,
	authorFilter,
}) => {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

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
				<FilterBar
					topicFilter={topicFilter}
					setTopicFilter={setTopicFilter}
					authorFilter={authorFilter}
					setAuthorValue={setAuthorValue}
					authorValue={authorValue}
					setAuthorFilter={setAuthorFilter}
				/>
			</div>
		</header>
	);
};

export default Header;
