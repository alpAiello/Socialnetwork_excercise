import React, { Component } from "react";
import axios from "../superAxios";
import FriendButton from "./FriendButton";

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            bio: "",
            profile_picture_url: "",
            id: "",
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
            id,
            firstname,
            lastname,
            email,
            bio,
            profile_picture_url,
            success,
        } = this.state;

        return (
            <div className="OtherProfile">
                {success && (
                    <img src={profile_picture_url} alt="profile picture" />
                )}
                {!success && <h1>profile not found ⛔️</h1>}
                <h1>{firstname + " " + lastname}</h1>
                <p>{email}</p>
                <p>{bio}</p>
                {id && <FriendButton otherID={id} />}
            </div>
        );
    }
}

export default OtherProfile;
