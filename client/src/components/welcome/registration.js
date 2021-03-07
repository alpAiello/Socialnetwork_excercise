import React, { Component } from "react";
import { Button, Input, InputLabel, FormControl } from "@material-ui/core";
import axios from "axios";
import AccountCircle from "@material-ui/icons/AccountCircle";

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
			.then((response) => {
				if (
					response.data.registrationMessage ==
					"registration successfully"
				) {
					location.replace("/");
				} else {
					this.setState({
						[this.errorMessage]: response.data.registrationMessage,
					});
				}
			});
	};

	render() {
		return (
			<div>
				<FormControl>
					<InputLabel htmlFor="username">Username</InputLabel>
					<Input
						color="primary"
						onChange={this.changeState}
						value={this.state.username}
						type="text"
						id="username"
						name="username"
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor="firstname">Firstname</InputLabel>
					<Input
						color="primary"
						onChange={this.changeState}
						value={this.state.firstname}
						type="text"
						id="firstname"
						name="firstname"
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor="lastname">Lastname</InputLabel>
					<Input
						color="primary"
						onChange={this.changeState}
						value={this.state.lastname}
						type="text"
						id="lastname"
						name="lastname"
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor="email">E-Mail</InputLabel>
					<Input
						color="primary"
						onChange={this.changeState}
						value={this.state.email}
						type="email"
						id="email"
						name="email"
					/>
				</FormControl>
				<FormControl>
					<InputLabel htmlFor="password">Password</InputLabel>
					<Input
						type="password"
						autoComplete="current-password"
						variant="outlined"
						color="primary"
						onChange={this.changeState}
						value={this.state.password}
						type="password"
						id="password"
						name="password"
					/>
				</FormControl>
				<Button variant="outlined" onClick={this.submitRegistration}>
					submit
				</Button>
			</div>
		);
	}
}

export default Registration;
