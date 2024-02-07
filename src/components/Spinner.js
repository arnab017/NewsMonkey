import React, { Component } from "react";
import spinner from "./spinner.gif";

export default class Spinner extends Component {
	render() {
		return (
			<div className="flex justify-center py-[1rem]">
				<img src={spinner} alt="loading" />
			</div>
		);
	}
}
