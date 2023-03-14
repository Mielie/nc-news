import { useLocation } from "react-router-dom";

const Footer = ({
	pageNumber,
	setPageNumber,
	commentPageNumber,
	setCommentPageNumber,
	numItems,
	articlesPerPage,
	articleWordCount,
}) => {
	const { pathname: path } = useLocation();

	const articleView = /\/articles\/[0-9]+/i.test(path);
	const totalPages = Math.ceil(numItems / articlesPerPage);
	const pageNumbers = createPageNumberButtons(
		articleView ? commentPageNumber : pageNumber,
		totalPages,
		setPageNumber,
		setCommentPageNumber,
		articleView
	);

	return numItems ? (
		<footer id="footerBox">
			<div id="pageNumberText">
				<span>Page: </span>
				{pageNumbers}
			</div>
			<div id="footerRightText">
				{articleView
					? articleWordCount
						? `${articleWordCount} words`
						: null
					: `${numItems} article${numItems === 1 ? "" : "s"}`}
			</div>
		</footer>
	) : (
		<footer id="footerBox"></footer>
	);
};

const createPageNumberButtons = (
	pageNumber,
	totalPages,
	setPageNumber,
	setCommentPageNumber,
	articleView
) => {
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
				onClick={() => {
					articleView ? setCommentPageNumber(n) : setPageNumber(n);
				}}
			>
				{n}
			</button>
		);
	}
	return pageNumbers;
};

export default Footer;
