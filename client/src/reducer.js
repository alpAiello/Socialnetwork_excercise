import axios from "./superAxios";
import action from "./action";

function reducer(state = {}, action = "") {
    if (action.type == "load friends") {
        const friendsAndWannabes = action.payload;
        console.log("hallo reducer", friendsAndWannabes);
        return { ...state, friendsAndWannabes };
    }
    return state;
}
export default reducer;
