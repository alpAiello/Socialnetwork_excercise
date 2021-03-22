import { useSelector } from "react-redux";

const Chat = (props) => {
    const chatMessages = useSelector((state) => state.messages);

    const chatMessagesDiv = (message) => {
        return (
            <div className="Chat" key={message.message_id}>
                <img alt="profile picture" src={message.profile_picture_url} />
                <p>{message.firstname + " " + message.lastname}</p>
                <p>{message.message_text}</p>
            </div>
        );
    };

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
        </div>
    );
};

export default Chat;
