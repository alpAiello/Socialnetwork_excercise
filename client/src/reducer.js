import axios from "./superAxios";
import action from "./action";

const initialState = {
    friendsAndWannabes: {},
};

async function reducer(state = initialState, action = "") {
    if (action.type == "load friends") {
        return { ...state, friendsAndWannabes: action.result };
    }
    return state;
}
export default reducer;
