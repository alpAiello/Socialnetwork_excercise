import { Component } from "react";
import { Button, Input, InputLabel, FormControl } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "../../superAxios.js";
import CssBaseline from "@material-ui/core/CssBaseline";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }
    changeState (event) {
        console.log("hello change");
        this.setState({ [event.target.name]: event.target.value });
    }

    submitLogin () {
        const { email, password } = this.state;
        axios
            .post(
                "/api/auth/login",
                {
                    email,
                    password,
                }
            )
            .then((response) => {
                if (
                    response.data.success === true
                ) {
                    location.replace("/");
                } else {
                    this.setState({
                        [this.errorMessage]: response.data.loginMessage,
                    });
                }
            });
    }

    render() {
        return (
            <Grid container width={4} direction="column" spacing={4}>
                <CssBaseline />
                <FormControl>
                    <InputLabel htmlFor="email">E-Mail</InputLabel>
                    <Input
                        color="primary"
                        onChange={(event)=>this.changeState(event)}
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
                        onChange={(event)=>this.changeState(event)}
                        value={this.state.password}
                        id="password"
                        name="password"
                    />
                </FormControl>
                <Button variant="outlined" onClick={() => this.submitLogin()}>
                    submit
                </Button>
            </Grid>
        );
    }
}

export default SignIn;
