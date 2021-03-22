import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { newMessage } from "../action";

const chatMessagesDiv = (message) => {
    return (
        <div className="Chat" key={message.message_id}>
            <img alt="profile picture" src={message.profile_picture_url} />
            <p>{message.firstname + " " + message.lastname}</p>
            <p>{message.message_text}</p>
        </div>
    );
};

export const Chat = (props) => {
    const chatMessages = useSelector((state) => state.messages);
    const [messageDraft, setMessageDraft] = useState("");

    const dispatch = useDispatch();

    console.log("gotmessages", chatMessages);
    console.log(
        "gotmessagesDiv",
        chatMessages.map((message) => {
            return chatMessagesDiv(message);
        })
    );
    return (
        <div>
            <h2>Chat</h2>
            {chatMessages.length &&
                chatMessages.map((message) => {
                    console.log("made div");
                    return chatMessagesDiv(message);
                })}
            <div className="newMessage">
                <input
                    type="text"
                    onChange={(event) => setMessageDraft(event.target.value)}
                />
                <button onClick={() => dispatch(newMessage(messageDraft))}>
                    send message
                </button>
            </div>
        </div>
    );
};

export default Chat;
