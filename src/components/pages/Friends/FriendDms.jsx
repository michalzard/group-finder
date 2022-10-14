import React from "react";
import "./FriendRequest.scss";
import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function FriendDms({ username, bio, id }) {
  return (
    <Link to="dm/id" className="friend-link">
      <div className="friend">
        <section>
          <Avatar sx={{ width: 30, height: 30, marginRight: "10px" }} />
          {/* Somehow display on top of avatar status circle */}
        </section>

        <section className="friend-user">
          <Typography variant="subtitle2" component="span">
            {username ? username : "Username"}
          </Typography>
          <Typography variant="caption" color="lightgray">
            {" "}
            {bio ? bio : "bio"}
          </Typography>
        </section>
      </div>
    </Link>
  );
}

export default FriendDms;
