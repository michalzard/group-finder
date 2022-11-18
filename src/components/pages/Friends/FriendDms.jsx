import React from "react";
import "./FriendRequest.scss";
import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFriendById } from "../../../redux/slices/friendsSlice";

function FriendDms({ friend }) {
  const dispatch = useDispatch();
  const { presence, currentFriend } = useSelector((state) => state.friends);
  const isOnline = (id) => {
    if (presence.includes(id)) return true;
    else return false;
  };

  if (!friend) return;
  return (
    <Link
      to={`dm/${friend.id}`}
      className="friend-link"
      onClick={() => {
        if (currentFriend.id !== friend.id) {
          dispatch(setFriendById({ id: friend.id }));
        }
      }}
    >
      <div className="friend">
        <section>
          <Avatar sx={{ width: 30, height: 30, marginRight: "10px" }} />
          <div
            className="userStatus"
            style={{
              backgroundColor: isOnline(friend.id) ? "greenyellow" : "gray",
            }}
          />
        </section>

        <section className="friend-user">
          <Typography variant="subtitle2" component="span">
            {friend.username ? friend.username : "Username"}
          </Typography>
          <Typography variant="caption" color="lightgray">
            {" "}
            {friend.bio ? friend.bio : "bio"}
          </Typography>
        </section>
      </div>
    </Link>
  );
}

export default FriendDms;
