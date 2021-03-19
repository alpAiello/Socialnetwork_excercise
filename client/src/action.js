import axios from "./superAxios";

export const loadFriends = async () => {
    const result = await axios.get("/api/friend-requests/friends-and-wannabes");
    return {
        type: "load friends",
        result,
        /*FriendsAndWannabes,*/
    };
};
