import axios from "./superAxios";

export const LOAD_FRIENDS = "load friends";
export const ACCEPT_FRIEND = "accept friend";
export const UNFRIEND = "unfriend friend";

export const loadFriends = async () => {
    const result = await axios.get("/api/friend-requests/friends-and-wannabes");
    const friendsAndWannabesList = result.data;
    return {
        type: LOAD_FRIENDS,
        payload: friendsAndWannabesList,
    };
};

export const acceptFriend = async (otherID) => {
    const result = await axios.post("/api/friend-requests/accept/" + otherID);
    const statusFriendRequest = result.data;
    console.log(statusFriendRequest);
    return {
        type: ACCEPT_FRIEND,
        payload: statusFriendRequest,
    };
};

export const unfriend = async (otherID) => {
    const result = await axios.post("/api/friend-requests/unfriend/" + otherID);
    const statusFriendRequest = result.data;
    console.log(statusFriendRequest);
    return {
        type: UNFRIEND,
        payload: statusFriendRequest,
    };
};
export const chatMessages = async (msgs) => {
    return {
        type: "messages",
        msgs,
    };
};
export const chatMessage = async (msg) => {
    return {
        type: "messages",
        msgs: [msg],
    };
};
