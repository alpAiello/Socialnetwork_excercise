import React, { Component } from "react";
import axios from "axios";

class Registration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			firstname: "",
			lastname: "",
			email: "",
			password: "",
		};
	}
	changeState = (event) => {
		console.log("hello change");
		this.setState({ [event.target.name]: event.target.value });
	};
	submitRegistration = (event) => {
		const { username, firstname, lastname, email, password } = this.state;
		axios
			.post("/api/auth/register", {
				username,
				firstname,
				lastname,
				email,
				password,
			})
			.then((response) => console.log("got response", response));
	};

	render() {
		return (
			<div>
				<label htmlFor="username">Username</label>
				<input
					onChange={this.changeState}
					value={this.state.username}
					type="text"
					id="username"
					name="username"
				/>
				<label htmlFor="firstname">Firstname</label>
				<input
					onChange={this.changeState}
					value={this.state.firstname}
					type="text"
					id="firstname"
					name="firstname"
				/>
				<label htmlFor="lastname">Lastname</label>
				<input
					onChange={this.changeState}
					value={this.state.lastname}
					type="text"
					id="lastname"
					name="lastname"
				/>
				<label htmlFor="email">E-Mail</label>
				<input
					onChange={this.changeState}
					value={this.state.email}
					type="text"
					id="email"
					name="email"
				/>
				<label htmlFor="password">Password</label>
				<input
					onChange={this.changeState}
					value={this.state.password}
					type="text"
					id="password"
					name="password"
				/>
				<button onClick={this.submitRegistration}>submit</button>
			</div>
		);
	}
}

export default Registration;
