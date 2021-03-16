import { useEffect, useState } from "react";
import axios from "../superAxios";

function FriendButton(props) {
    console.log("Friendbutton", props);
    const [status, setStatus] = useState("");

    useEffect(async () => {
        let currentStatus = await axios.get(
            "/api/friend-requests/" + props.otherID
        );
        currentStatus = currentStatus.data.status;
        console.log("current", currentStatus);
        setStatus(currentStatus);
    }, []);

    return (
        <div>
            <button>{status}</button>
        </div>
    );
}

export default FriendButton;
