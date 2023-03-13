const Footer = ({
	pageNumber,
	setPageNumber,
	numArticles,
	articlesPerPage,
}) => {
	const totalPages = Math.ceil(numArticles / articlesPerPage);
	const pageNumbers = [<span key="0">Page: </span>];

	const changePage = (event) => {
		setPageNumber(Number(event.target.innerText));
	};

	if (totalPages <= 5) {
		for (let p = 1; p <= totalPages; p++) {
			pageNumbers.push(
				<button
					className="pageNumberButton"
					key={p}
					disabled={p === pageNumber ? true : false}
					onClick={changePage}
				>
					{p}
				</button>
			);
		}
	}

	return numArticles ? (
		<footer id="footerBox">
			<div id="pageNumberText">
				{numArticles <= 10 ? `${numArticles} articles` : pageNumbers}
			</div>
		</footer>
	) : (
		<footer id="footerBox"></footer>
	);
};

export default Footer;
