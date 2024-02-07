import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

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
			totalResults: 0,
		};
		document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
	}

	async updateNews() {
		this.props.setProgress(10);
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
		this.setState({ loading: true });
		let data = await fetch(url);
		this.props.setProgress(30);
		let parsedData = await data.json();
		this.props.setProgress(70);
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false,
		});
		this.props.setProgress(100);
	}

	async componentDidMount() {
		this.updateNews();
	}

	fetchMoreData = async () => {
		this.setState({ page: this.state.page + 1 });
		setTimeout(async () => {
			const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
			this.setState({ loading: true });
			let data = await fetch(url);
			let parsedData = await data.json();
			this.setState({
				articles: this.state.articles.concat(parsedData.articles),
				totalResults: parsedData.totalResults,
				loading: false,
			});
		}, 1000);
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
					<InfiniteScroll
						dataLength={this.state.articles.length}
						next={this.fetchMoreData}
						hasMore={this.state.articles.length !== this.state.totalResults}
						loader={<Spinner />}>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{this.state.articles.map((article) => {
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
					</InfiniteScroll>
				</div>
			</div>
		);
	}
}
