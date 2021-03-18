import { useEffect, useState } from "react";
import axios from "../superAxios";
import {
    STATUS_FRIENDS_REQUEST_NO_REQUEST,
    STATUS_FRIENDS_REQUEST_REQUEST_ACCEPTED,
    STATUS_FRIENDS_REQUEST_REQUEST_BY_ME,
    STATUS_FRIENDS_REQUEST_REQUEST_TO_ME,
} from "../../../server/routes/friend-requests";

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

    const clickHandler = async (event) => {
        if (event === "send") {
            const result = await axios.post(
                "/api/friend-requests/make/" + props.otherID
            );
            setStatus(result.data.status);
            return result;
        }
        if (event === "cancel") {
            const result = await axios.post(
                "/api/friend-requests/cancel/" + props.otherID
            );
            setStatus(result.data.status);
            return result;
        }
        if (event === "accept") {
            const result = await axios.post(
                "/api/friend-requests/accept/" + props.otherID
            );
            setStatus(result.data.status);
            return result;
        }
        if (event === "unfriend") {
            const result = await axios.post(
                "/api/friend-requests/unfriend/" + props.otherID
            );
            setStatus(result.data.status);
            return result;
        }
    };

    return (
        <div>
            {status === STATUS_FRIENDS_REQUEST_NO_REQUEST && (
                <button
                    onClick={() => {
                        clickHandler("send");
                    }}
                >
                    send request
                </button>
            )}
            {status === STATUS_FRIENDS_REQUEST_REQUEST_BY_ME && (
                <button
                    onClick={() => {
                        clickHandler("cancel");
                    }}
                >
                    cancel request
                </button>
            )}
            {status === STATUS_FRIENDS_REQUEST_REQUEST_TO_ME && (
                <button
                    onClick={() => {
                        clickHandler("accept");
                    }}
                >
                    accept request
                </button>
            )}
            {status === STATUS_FRIENDS_REQUEST_REQUEST_ACCEPTED && (
                <button
                    onClick={() => {
                        clickHandler("unfriend");
                    }}
                >
                    unfriend
                </button>
            )}
        </div>
    );
}

export default FriendButton;
