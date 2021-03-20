import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { acceptFriend, unfriend, loadFriends } from "../action";
import { Link } from "react-router-dom";
import { UNFRIEND, ACCEPT_FRIEND } from "../action";

const FriendsAndWannabes = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadFriends());
    }, []);
    const friendsAndWannabes = useSelector((state) => state.friendsAndWannabes);
    console.log("friends...", friendsAndWannabes);

    const statusButton = (status, otherID) => {
        return (
            <button
                onClick={async () => {
                    if (status) {
                        await dispatch(unfriend(otherID));
                    } else {
                        await dispatch(acceptFriend(otherID));
                    }
                }}
            >
                {status ? UNFRIEND : ACCEPT_FRIEND}
            </button>
        );
    };

    const generatePeopleDiv = (friend) => {
        return (
            <div key={friend.id}>
                <img alt="profile picture" src={friend.profile_picture_url} />
                <Link to={"/user/" + friend.id}>
                    to {friend.firstname}`s profile
                </Link>
                <p>{friend.firstname + " " + friend.lastname}</p>
                {statusButton(friend.accepted, friend.id)}
            </div>
        );
    };

    return (
        <>
            <div>friends</div>
            {friendsAndWannabes &&
                friendsAndWannabes
                    .filter((friend) => friend.accepted === true)
                    .map((friend) => generatePeopleDiv(friend))}
            <div>requests</div>
            {friendsAndWannabes &&
                friendsAndWannabes
                    .filter((friend) => friend.accepted === false)
                    .map((friend) => generatePeopleDiv(friend))}
        </>
    );
};

export default FriendsAndWannabes;
