import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { useState, useEffect } from "react";
import { getUsers } from "./apiFunctions";
import LoadingSpinner from "./LoadingSpinner";

const Login = ({ setNumItems }) => {
	const { user, setUser } = useContext(UserContext);
	const [users, setUsers] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		setNumItems(null);
		setIsLoading(true);
		getUsers().then((users) => {
			setUsers(users);
			setIsLoading(false);
		});
	}, []);

	const changeUser = (newUser) => {
		setUser(newUser);
		navigate("/");
	};

	return isLoading ? (
		<div id="loginBoxLoading">
			<p id="loginLoadingText">Loading Users</p>
			<LoadingSpinner />
		</div>
	) : (
		<div id="loginBox">
			{users.map((user) => {
				return (
					<a
						key={user.username}
						className="userCard"
						onClick={() => changeUser(user)}
					>
						<img
							className="userCardAvatar"
							src={user.avatar_url}
							alt={user.username}
						/>
						<p className="userCardUserName">{user.username}</p>
					</a>
				);
			})}
		</div>
	);
};

export default Login;
