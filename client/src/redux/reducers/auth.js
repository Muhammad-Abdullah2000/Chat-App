import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAdmin: false,
    loader: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userExits: (state, action) => {
            state.user = action.payload;
            state.loader = false;
        },
        userNotExits: (state) => {
            state.user = null;
            state.loader = false;
        },
    },
});

export default authSlice;
export const { userExits, userNotExits } = authSlice.actions;