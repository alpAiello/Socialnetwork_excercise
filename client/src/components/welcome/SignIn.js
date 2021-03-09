import { Component } from "react";
import {
    Button,
    Input,
    InputLabel,
    FormControl,
    Container,
    Link,
    FormHelperText,
} from "@material-ui/core";
import axios from "../../superAxios.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link as routerLink } from "react-router-dom";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    submitLogin() {
        const { email, password } = this.state;
        axios
            .post("/api/auth/login", {
                email,
                password,
            })
            .then((response) => {
                if (response.data.success === true) {
                    location.replace("/");
                } else {
                    this.setState({
                        success: response.data.success,
                        errorMessage: response.data.loginMessage,
                    });
                }
            });
    }

    render() {
        return (
            <Container maxWidth="xs">
                <CssBaseline />
                <FormControl item>
                    <InputLabel htmlFor="email">E-Mail</InputLabel>
                    <Input
                        color="secondary"
                        onChange={(event) => this.changeState(event)}
                        value={this.state.email}
                        type="email"
                        id="email"
                        name="email"
                        error={!this.state.email && this.state.errorMessage}
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
                        error={!this.state.password && this.state.errorMessage}
                    />
                    <FormHelperText error={this.state.password === ""}>
                        {!this.state.password ? this.state.errorMessage : ""}
                    </FormHelperText>
                </FormControl>
                <p>
                    {"no account yet? register "}
                    <Link component={routerLink} to="/">
                        here
                    </Link>
                </p>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => this.submitLogin()}
                >
                    submit
                </Button>
            </Container>
        );
    }
}

export default SignIn;
