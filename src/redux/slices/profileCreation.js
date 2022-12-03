import { createSlice } from "@reduxjs/toolkit";
import { profile } from "console";

const initialState = {
  nickname: "",
  roles: [],
  rank: "",
  age: "",
  // profile -> user submits picture and short biography,
  profile: {
    imgUrl: "",
    bio: "",
  },
  integrations: {
    discord: {
      id: "",
      avatar: "",
      username: "",
    },
  },
};

const profileCreationSlice = createSlice({
  name: "Profile Creation",
  initialState,
  reducers: {
    setNickname: (state, { payload }) => {
      if (typeof payload === "string") state.nickname = payload;
    },
    setRoles: (state, { payload }) => {
      if (typeof payload === "string")
        state.roles.push((prev) => [...prev, payload]);
      else if (Array.isArray(payload)) {
        state.roles = payload;
      }
    },
    setRank: (state, { payload }) => {
      if (typeof payload === "string") state.rank = payload;
    },
    setProfile: (state, { payload }) => {
      const { imgURL, bio } = payload;
      state.profile.imgUrl = imgURL;
      state.profile.bio = bio;
    },
    setIntegration: (state, { payload }) => {
      const { integrationName, ...params } = payload;
      if (integrationName === "discord") {
        state.integrations.discord.id = params.id;
        state.integrations.discord.avatar = params.avatar;
        state.integrations.discord.username = params.username;
      }
    },
    resetProfileCreator: (state) => {
      state = initialState;
    },
  },
});

export const {
  setNickname,
  setRoles,
  setRank,
  setProfile,
  setIntegration,
  resetProfileCreator,
} = profileCreationSlice.actions;

export default profileCreationSlice.reducer;
