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

	let p = pageNumber - 2;
	let q = pageNumber + 2;

	if (totalPages <= 5 || pageNumber <= 3) {
		p = 1;
		q = totalPages;
	} else if (pageNumber >= totalPages - 5) {
		p = totalPages - 5;
		q = totalPages;
	}

	for (let n = p; n <= q; n++) {
		pageNumbers.push(
			<button
				className="brandedButton pageNumberButton"
				key={n}
				disabled={n === pageNumber ? true : false}
				onClick={changePage}
			>
				{n}
			</button>
		);
	}

	return numArticles ? (
		<footer id="footerBox">
			<div id="pageNumberText">{pageNumbers}</div>
			<div id="articleCount">
				{`${numArticles} article${numArticles === 1 ? "" : "s"}`}
			</div>
		</footer>
	) : (
		<footer id="footerBox"></footer>
	);
};

export default Footer;
