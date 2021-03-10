import { Component } from "react";
import {
    Button,
    Input,
    InputLabel,
    FormControl,
    Link,
    FormHelperText,
} from "@material-ui/core";
import { Link as routerLink } from "react-router-dom";
import axios from "../../superAxios.js";

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            errorMessage: "",
            success: "not started",
            step: 1,
        };
    }
    submitEmailAdress() {
        axios
            .post("/api/auth/reset-password", { email: this.state.email })
            .then((res) => {
                this.setState({ step: 2 });
                console.log(res.data);
            });
    }
    changeState() {
        this.setState({ email: event.target.value });
    }
    render() {
        return (
            <div className="ResetPassword">
                <FormControl>
                    <InputLabel htmlFor="email">E-Mail</InputLabel>
                    <Input
                        type="email"
                        autoComplete="current-email"
                        color="secondary"
                        onChange={(event) => this.changeState(event)}
                        value={this.state.email}
                        id="email"
                        name="email"
                        error={!this.state.email && !this.state.success}
                    />
                    <FormHelperText error={this.state.email === ""}>
                        {!this.state.email ? this.state.errorMessage : ""}
                    </FormHelperText>
                </FormControl>
                <p>
                    {"login "}
                    <Link component={routerLink} to="/login">
                        here
                    </Link>
                </p>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => this.submitEmailAdress()}
                >
                    submit
                </Button>
            </div>
        );
    }
}
export default ResetPassword;
