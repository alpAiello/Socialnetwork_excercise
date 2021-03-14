import React, { Component } from "react";
import axios from "../superAxios";

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            bio: "",
            profile_picture_url: "",
        };
    }

    async getUserData() {
        const result = await axios.get(
            "/api/profile/users/" + this.props.match.params.id
        );
        result.data.isSignedInUser
            ? this.props.history.replace("/")
            : this.setState({ ...result.data });
    }
    componentDidMount() {
        this.getUserData();
    }

    render() {
        const {
            firstname,
            lastname,
            email,
            bio,
            profile_picture_url,
        } = this.state;

        return (
            <div className="OtherProfile">
                <img src={profile_picture_url} alt="profile picture" />
                <h1>{firstname + " " + lastname}</h1>
                <p>{email}</p>
                <p>{bio}</p>
            </div>
        );
    }
}

export default OtherProfile;
