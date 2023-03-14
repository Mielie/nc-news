const LoadingSpinner = ({ id }) => {
	return (
		<div className="lds-ellipsis" id={id}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default LoadingSpinner;
