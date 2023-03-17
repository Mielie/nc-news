import { Link } from "react-router-dom";

const InvalidPath = () => {
	return (
		<div id="FNFbox">
			<h2 id="FNFtitle">Page not found!</h2>
			<p id="FNFmessage">
				Ooops! I'm not sure how you got here but you've found a dead
				end! Click{" "}
				<Link to="/" id="homeLink">
					here
				</Link>{" "}
				to return to the main page or use the back button on your
				browser.
			</p>
		</div>
	);
};

export default InvalidPath;
