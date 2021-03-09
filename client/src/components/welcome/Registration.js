import { Component } from "react";
import {
	Link,
	Button,
	Input,
	InputLabel,
	FormControl,
	FormHelperText,
} from "@material-ui/core";
import axios from "../../superAxios.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Link as routerLink } from "react-router-dom";

class Registration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			firstname: "",
			lastname: "",
			email: "",
			password: "",
			success: "not started",
			errorMessage: "",
		};
	}
	changeState(event) {
		console.log("hello change");
		this.setState({ [event.target.name]: event.target.value });
	}

	submitRegistration() {
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
					response.data.registrationMessage ===
					"registration successfully"
				) {
					location.replace("/");
				} else {
					this.setState({
						success: response.data.success,
						errorMessage: response.data.registrationMessage,
					});
				}
			});
	}

	render() {
		return (
			<Container maxWidth="xs">
				<CssBaseline />
				<FormControl item>
					<InputLabel htmlFor="username">Username</InputLabel>
					<Input
						color="secondary"
						onChange={(event) => this.changeState(event)}
						value={this.state.username}
						type="text"
						id="username"
						name="username"
					/>
					<FormHelperText error={this.state.username === ""}>
						{!this.state.username ? this.state.errorMessage : ""}
					</FormHelperText>
				</FormControl>
				<FormControl item>
					<InputLabel htmlFor="firstname">Firstname</InputLabel>
					<Input
						color="secondary"
						onChange={(event) => this.changeState(event)}
						value={this.state.firstname}
						type="text"
						id="firstname"
						name="firstname"
					/>
					<FormHelperText error={this.state.firstname === ""}>
						{!this.state.firstname ? this.state.errorMessage : ""}
					</FormHelperText>
				</FormControl>
				<FormControl item>
					<InputLabel htmlFor="lastname">Lastname</InputLabel>
					<Input
						color="secondary"
						onChange={(event) => this.changeState(event)}
						value={this.state.lastname}
						type="text"
						id="lastname"
						name="lastname"
					/>
					<FormHelperText error={this.state.lastname === ""}>
						{!this.state.lastname ? this.state.errorMessage : ""}
					</FormHelperText>
				</FormControl>
				<FormControl item>
					<InputLabel htmlFor="email">E-Mail</InputLabel>
					<Input
						color="secondary"
						onChange={(event) => this.changeState(event)}
						value={this.state.email}
						type="email"
						id="email"
						name="email"
					/>
					<FormHelperText error={this.state.email === ""}>
						{!this.state.email ? this.state.errorMessage : ""}
					</FormHelperText>
				</FormControl>
				<FormControl item>
					<InputLabel htmlFor="password">Password</InputLabel>
					<Input
						type="password"
						autoComplete="current-password"
						variant="outlined"
						color="secondary"
						onChange={(event) => this.changeState(event)}
						value={this.state.password}
						id="password"
						name="password"
					/>
					<FormHelperText error={this.state.password === ""}>
						{!this.state.password ? this.state.errorMessage : ""}
					</FormHelperText>
				</FormControl>
				<p>allready have an account? login </p>
				<Link component={routerLink} to="/login">
					here
				</Link>
				<Button
					color="primary"
					variant="outlined"
					onClick={() => this.submitRegistration()}
				>
					submit
				</Button>
			</Container>
		);
	}
}

export default Registration;
