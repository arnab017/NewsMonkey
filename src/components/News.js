import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
	static defaultProps = { country: "in", pageSize: 6, category: "general" };

	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		mode: PropTypes.string,
		category: PropTypes.string,
	};

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			loading: false,
			page: 1,
		};
		document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
	}

	async updateNews() {
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a879fd205c5d4279bd36b8f6d3f6eb11&page=${this.state.page}&pageSize=${this.props.pageSize}`;
		this.setState({ loading: true });
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({
			articles: parsedData.articles,
			totalArticles: parsedData.totalResults,
			loading: false,
		});
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}

	async componentDidMount() {
		this.updateNews();
	}

	handlePrevClick = async () => {
		// a879fd205c5d4279bd36b8f6d3f6eb11
		console.log("----->PREV before", this.state.page);
		this.setState({ page: this.state.page - 1 }, () => {
			console.log("----->PREV after", this.state.page);
			this.updateNews();
		});
	};

	handleNextClick = async () => {
		console.log("----->NEXT before", this.state.page);
		this.setState({ page: this.state.page + 1 }, () => {
			console.log("----->NEXT after", this.state.page);
			this.updateNews();
		});
	};

	render() {
		return (
			<div
				className={`flex flex-col items-center justify-center ${
					this.props.mode === "dark" ? "bg-[#232D3F] text-white" : "bg-[#fff]"
				}`}>
				<div className="my-4 mx-[2rem] md:mx-[3rem] lg:mx-[4rem] xl:mx-[6rem] 2xl:mx-[8rem]">
					<h1 className="text-1xl md:text-1.5xl lg:text-1.7xl xl:text-2xl font-bold mb-4 text-center">
						{`NewsMonkey - Top ${this.capitalizeFirstLetter(this.props.category)} Headlines`}
					</h1>

					{this.state.loading && <Spinner />}

					<div className="grid grid-cols-1 sm:grid-cols-2	 lg:grid-cols-3 gap-4">
						{!this.state.loading &&
							this.state.articles.map((article) => {
								return (
									<NewsItem
										mode={this.props.mode}
										key={article.url}
										urlToImage={article.urlToImage}
										title={article.title}
										description={article.description}
										url={article.url}
										author={article.author}
										publishedAt={article.publishedAt}
										source={article.source.name}
									/>
								);
							})}
					</div>
					<div className="flex justify-center gap-[1rem]">
						<button
							onClick={this.handlePrevClick}
							disabled={this.state.page <= 1}
							type="button"
							className="px-[1rem] py-[0.6rem] bg-[#9fafff] hover:bg-[#8c9be9] rounded-md shadow-sm text-black text-[0.8rem] md:text-[1rem]">
							&larr; Previous
						</button>
						<button
							onClick={this.handleNextClick}
							disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)}
							type="button"
							className="px-[1rem] py-[0.6rem] bg-[#9fafff] hover:bg-[#8c9be9] rounded-md shadow-sm text-black text-[0.8rem] md:text-[1rem]">
							Next &rarr;
						</button>
					</div>
				</div>
			</div>
		);
	}
}
