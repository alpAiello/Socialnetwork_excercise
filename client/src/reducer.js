import { LOAD_FRIENDS, ACCEPT_FRIEND, UNFRIEND } from "./action";

function reducer(state = {}, action = "") {
    if (action.type == LOAD_FRIENDS) {
        const friendsAndWannabes = action.payload;
        return { ...state, friendsAndWannabes };
    }
    if (action.type == ACCEPT_FRIEND) {
        const statusFriendRequest = action.payload;
        let friendsAndWannabes = state.friendsAndWannabes.map((friend) => {
            if (friend.id === statusFriendRequest.from_id) {
                friend.accepted = true;
                return friend;
            } else {
                return friend;
            }
        });
        console.log("newState-------------------->", friendsAndWannabes);
        return { ...state, friendsAndWannabes };
    }
    if (action.type == UNFRIEND) {
        const statusFriendRequest = action.payload;
        let friendsAndWannabes = state.friendsAndWannabes.filter((friend) => {
            console.log("friend.id", friend.id);
            console.log(
                "statusFriendRequest.from_id",
                statusFriendRequest.from_id
            );
            return (
                friend.id !== statusFriendRequest.from_id &&
                friend.id !== statusFriendRequest.to_id
            );
        });
        console.log("newState-------------------->", friendsAndWannabes);
        return { ...state, friendsAndWannabes };
    }

    return state;
}
export default reducer;
