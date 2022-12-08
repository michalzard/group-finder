import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nickname: "",
  roles: [],
  rank: 0,
  age: 18,
  agents: [],
  profile: {
    imgUrl: "",
    bio: "",
  },
};

const profileCreationSlice = createSlice({
  name: "Profile Creator",
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
    setAgents: (state, { payload }) => {
      if (typeof payload === "string")
        state.agents.push((prev) => [...prev, payload]);
      else if (Array.isArray(payload)) {
        state.agents = payload;
      }
    },
    setAge: (state, { payload }) => {
      if (typeof payload === "number") state.age = payload;
    },
    setRank: (state, { payload }) => {
      if (typeof payload === "number") state.rank = payload;
    },
    setBio: (state, { payload }) => {
      state.profile.bio = payload;
    },
    setImage: (state, { payload }) => {
      state.profile.imgUrl = payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const {
  setNickname,
  setRoles,
  setAgents,
  setRank,
  setAge,
  setBio,
  setImage,
  reset,
} = profileCreationSlice.actions;

export default profileCreationSlice.reducer;
