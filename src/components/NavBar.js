import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Navbar extends Component {
	static propTypes = {
		toggleMode: PropTypes.func,
		mode: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			isMenuOpen: false,
		};
	}

	toggleMenu = () => {
		this.setState((prevState) => ({
			isMenuOpen: !prevState.isMenuOpen,
		}));
	};

	render() {
		return (
			<nav
				className={` ${
					this.props.mode === "dark"
						? "bg-[#000] text-white shadow shadow-gray-400"
						: "bg-[#fff] text-black border-b-[1px] shadow-md"
				}  sticky top-0 z-[100] w-[100%] p-4`}>
				<div className="flex items-center lg:justify-start justify-between w-full flex-wrap">
					{/* Logo */}
					<Link className="text-2xl font-bold" to="/General">
						NewsMonkey
					</Link>

					<div
						onClick={this.props.toggleMode}
						className={`${
							this.props.mode === "dark" ? "bg-[#fff]" : "bg-[#000]"
						} p-[0.5rem] sm:p-[0.7rem] md:p-[0.9rem] rounded-full mx-[1rem] sm:mx-[0.5rem] hover:cursor-pointer`}></div>

					{/* Navigation Menu */}
					<ul className="hidden md:flex flex-wrap space-x-4 ml-[2rem] ">
						<li>
							<Link to="/General">General</Link>
						</li>
						<li>
							<Link to="/Business">Business</Link>
						</li>
						<li>
							<Link to="/Entertainment">Entertainment</Link>
						</li>
						<li>
							<Link to="/Health">Health</Link>
						</li>
						<li>
							<Link to="/Science">Science</Link>
						</li>
						<li>
							<Link to="/Sports">Sports</Link>
						</li>
						<li>
							<Link to="/Technology">Technology</Link>
						</li>
					</ul>

					{/* Responsive Navigation Toggle (visible on small screens) */}
					<div className="md:hidden flex justify-center items-center">
						<button onClick={this.toggleMenu}>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16m-7 6h7"></path>
							</svg>
						</button>
					</div>
				</div>

				{/* Responsive Navigation Menu (hidden by default) */}
				<div className={`mt-4 ${this.state.isMenuOpen ? "block" : "hidden"}`}>
					<ul className="flex flex-col space-y-2">
						<li>
							<Link to="/Business">Business</Link>
						</li>
						<li>
							<Link to="/Entertainment">Entertainment</Link>
						</li>
						<li>
							<Link to="/General">General</Link>
						</li>
						<li>
							<Link to="/Health">Health</Link>
						</li>
						<li>
							<Link to="/Science">Science</Link>
						</li>
						<li>
							<Link to="/Sports">Sports</Link>
						</li>
						<li>
							<Link to="/Technology">Technology</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;
