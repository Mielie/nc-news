const Footer = ({
	pageNumber,
	setPageNumber,
	numArticles,
	articlesPerPage,
}) => {
	const totalPages = Math.ceil(numArticles / articlesPerPage);
	const pageNumbers = [];

	let start = pageNumber - 2;
	let end = pageNumber + 2;

	if (totalPages <= 5 || pageNumber <= 3) {
		start = 1;
		end = totalPages;
	} else if (pageNumber >= totalPages - 5) {
		start = totalPages - 5;
		end = totalPages;
	}

	for (let n = start; n <= end; n++) {
		pageNumbers.push(
			<button
				className="brandedButton pageNumberButton"
				key={n}
				disabled={n === pageNumber ? true : false}
				onClick={() => setPageNumber(n)}
			>
				{n}
			</button>
		);
	}

	return numArticles ? (
		<footer id="footerBox">
			<div id="pageNumberText">
				<span>Page: </span>
				{pageNumbers}
			</div>
			<div id="articleCount">
				{`${numArticles} article${numArticles === 1 ? "" : "s"}`}
			</div>
		</footer>
	) : (
		<footer id="footerBox"></footer>
	);
};

export default Footer;
