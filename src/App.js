import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "light",
			progress: 0,
		};
	}

	toggleMode = () => {
		if (this.state.mode === "light") {
			this.setState({ mode: "dark" });
		} else {
			this.setState({ mode: "light" });
		}
	};

	pageSize = 12;
	apiKey = process.env.REACT_APP_NEWS_API

	setProgress = (progress) => {
		this.setState({
			progress: progress,
		});
	};

	render() {
		return (
			<div className={`${this.props.mode === "dark" ? "bg-[#494949] text-white" : "bg-[#fff]"}`}>
				<Router>
					<LoadingBar height={3} color="#f11946" progress={this.state.progress} />
					<Navbar toggleMode={this.toggleMode} mode={this.state.mode} />

					<Routes>
						<Route
							exact
							path="/general"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="general"
									pageSize={this.pageSize}
									country="us"
									category="general"
									mode={this.state.mode}
								/>
							}
						/>

						<Route
							exact
							path="/business"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="business"
									pageSize={this.pageSize}
									country="us"
									category="business"
									mode={this.state.mode}
								/>
							}
						/>

						<Route
							exact
							path="/entertainment"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="entertainment"
									pageSize={this.pageSize}
									country="us"
									category="entertainment"
									mode={this.state.mode}
								/>
							}
						/>

						<Route
							exact
							path="/health"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="health"
									pageSize={this.pageSize}
									country="us"
									category="health"
									mode={this.state.mode}
								/>
							}
						/>

						<Route
							exact
							path="/science"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="science"
									pageSize={this.pageSize}
									country="us"
									category="science"
									mode={this.state.mode}
								/>
							}
						/>

						<Route
							exact
							path="/sports"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="sports"
									pageSize={this.pageSize}
									country="us"
									category="sports"
									mode={this.state.mode}
								/>
							}
						/>

						<Route
							exact
							path="/technology"
							element={
								<News
									setProgress={this.setProgress}
									apiKey={this.apiKey}
									key="technology"
									pageSize={this.pageSize}
									country="us"
									category="technology"
									mode={this.state.mode}
								/>
							}
						/>
					</Routes>
				</Router>
			</div>
		);
	}
}
