import React, { Component } from "react";

export default class NewsItem extends Component {
	truncateText(text, maxLength) {
		if (text && text.length > maxLength) {
			return text.slice(0, maxLength).trim() + " ...";
		}
		return text;
	}

	render() {
		let { urlToImage, title, description, url, author, publishedAt, source } = this.props;
		const truncatedDescription = this.truncateText(description, 100);
		const truncatedTitle = this.truncateText(title, 50);

		// Provide a default image URL if urlToImage is null
		const imageUrl = urlToImage
			? urlToImage
			: "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg";

		return (
			<div>
				<div
					className={`relative z-[4] my-[2rem] ${
						this.props.mode === "dark"
							? "bg-[#2a4c8a] text-white shadow-slate-800 hover:shadow-lg hover:shadow-slate-950"
							: "bg-[#fff] shadow-slate-400 hover:shadow-lg hover:shadow-slate-400"
					} rounded-md h-[max-content] sm:h-[24rem] md:h-[23rem] lg:h-[26rem] overflow-hidden shadow-md  transition-shadow`}>
					<span className="py-[0.3rem] px-[2rem] text-sm font-extrabold text-white rounded-full bg-[#e22b2b] absolute top-0 right-[-8px] z-[5]">
						{source}
					</span>
					{/* Card Image */}
					<img className="object-cover w-full h-48" src={imageUrl} alt={title || "Default Image"} />

					{/* Card Header */}
					<div className="p-4">
						<a
							href={url || "#"}
							target="_blank"
							rel="noopener noreferrer"
							className={`text-[0.9rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] font-semibold ${
								this.props.mode === "dark" ? "text-[#eeeeee]" : "text-gray-800"
							} hover:underline`}>
							{title ? truncatedTitle : " "}
						</a>
						<p
							className={`text-[0.8rem] ${
								this.props.mode === "dark" ? "text-[#dadada]" : "text-gray-600"
							}`}>
							By {author ? author : "Unknown"} on {publishedAt ? new Date(publishedAt).toGMTString() : ""}
						</p>
					</div>

					{/* Card Body */}
					<div className="px-4 pb-4 h-[5.5rem] box-border overflow-scroll sm:overflow-hidden">
						<p
							className={`${
								this.props.mode === "dark" ? "text-[#e1e1e1]" : "text-gray-600"
							}  text-[0.8rem] md:text-[0.9rem]`}>
							{description ? truncatedDescription : " "}
						</p>
					</div>
				</div>
			</div>
		);
	}
}
