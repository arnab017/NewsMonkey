import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "light",
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

	render() {
		return (
			<div className={`${this.props.mode === "dark" ? "bg-[#494949] text-white" : "bg-[#fff]"}`}>
				<Router>
					<Navbar toggleMode={this.toggleMode} mode={this.state.mode} />

					<Routes>
						<Route
							exact
							path="/general"
							element={
								<News
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
