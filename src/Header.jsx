import { useLocation, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

const Header = () => {
	const { pathname: path } = useLocation();
	const navigate = useNavigate();
	const articleView = /\/articles\/[0-9]+/i.test(path);
	const loginView = path === "/login";
	const { user, setUser } = useContext(UserContext);

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
						<p></p>
					)}
					{loginView && user ? (
						<button
							id="logoutButton"
							onClick={() => {
								setUser(null);
								navigate("/");
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
