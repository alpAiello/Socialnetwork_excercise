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
            newPassword: "",
            reset_code: "",
            email: "",
            errorMessage: "",
            success: "not started",
            step: 1,
        };
    }
    submitEmail() {
        axios
            .post("/api/auth/create-reset-code", { email: this.state.email })
            .then((result) => {
                this.setState({ step: 2 });
                console.log("result from code creation", result);
            });
    }
    submitResetCode() {
        axios
            .post("/api/auth/reset-password", {
                email: this.state.email,
                newPassword: this.state.newPassword,
                reset_code: this.state.reset_code,
            })
            .then((res) => {
                this.setState({ step: 3 });
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }
    changeState() {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        if (this.state.step === 1) {
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
                        onClick={() => this.submitEmail()}
                    >
                        submit
                    </Button>
                </div>
            );
        } else if (this.state.step === 2) {
            return (
                <div className="ResetPassword">
                    <FormControl>
                        <InputLabel htmlFor="reset_code">Reset Code</InputLabel>
                        <Input
                            type="reset_code"
                            color="secondary"
                            onChange={(event) => this.changeState(event)}
                            value={this.state.reset_code}
                            id="reset_code"
                            name="reset_code"
                            error={
                                !this.state.reset_code && !this.state.success
                            }
                        />
                        <FormHelperText error={this.state.reset_code === ""}>
                            {!this.state.reset_code
                                ? this.state.errorMessage
                                : ""}
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="newPassword">
                            New Password
                        </InputLabel>
                        <Input
                            type="newPassword"
                            color="secondary"
                            onChange={(event) => this.changeState(event)}
                            value={this.state.newPassword}
                            id="newPassword"
                            name="newPassword"
                            error={
                                !this.state.newPassword && !this.state.success
                            }
                        />
                        <FormHelperText error={this.state.newPassword === ""}>
                            {!this.state.newPassword
                                ? this.state.errorMessage
                                : ""}
                        </FormHelperText>
                    </FormControl>
                    <div>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => this.setState({ step: 1 })}
                        >
                            back
                        </Button>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => this.submitResetCode()}
                        >
                            submit
                        </Button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        Your password was reset! You can now login with it.
                    </div>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => this.submitResetCode()}
                    >
                        back to login
                    </Button>
                </div>
            );
        }
    }
}

export default ResetPassword;
