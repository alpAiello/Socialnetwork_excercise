import axios from "./superAxios";

export const loadFriends = async () => {
    const result = await axios.get("/api/friend-requests/friends-and-wannabes");
    const friendsAndWannabesList = result.data;
    return {
        type: "load friends",
        payload: friendsAndWannabesList,
        /*FriendsAndWannabes,*/
    };
};
