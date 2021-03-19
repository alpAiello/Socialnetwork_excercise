import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadFriends } from "../action";

const FriendsAndWannabes = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadFriends());
    }, []);
    const friendsAndWannabes = useSelector((state) => state.friendsAndWannabes);
    console.log("friends...", friendsAndWannabes);
    return <div>{friendsAndWannabes}</div>;
};

export default FriendsAndWannabes;
