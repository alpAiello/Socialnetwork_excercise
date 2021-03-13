import { Component } from "react";

class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { visibilityHandler, profile_picture_url } = this.props;
        const profilePicture =
            profile_picture_url ||
            "https://via.placeholder.com/300.png/09f/fff";
        return (
            <div className="ProfilePic">
                <img
                    src={profilePicture}
                    alt="profile picture"
                    onClick={visibilityHandler}
                />
            </div>
        );
    }
}

export default ProfilePic;
