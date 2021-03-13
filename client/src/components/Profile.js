import { Component } from "react";
import PicUploader from "./PicUploader";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { visibilityHandler } = this.props;
        return (
            <div className="Profile">
                <img
                    srcSet={"https://via.placeholder.com/300.png/09f/fff"}
                    alt=""
                    onClick={visibilityHandler}
                />
            </div>
        );
    }
}

export default Profile;
