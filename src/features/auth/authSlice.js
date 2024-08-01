import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
        },
        setAccessAndRefreshToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        userLoggedOut: (state) => {
            state.accessToken = undefined;
            state.user = undefined;
            state.refreshToken = undefined;
        }
    }
});

export const { userLoggedIn, setAccessAndRefreshToken, userLoggedOut } =
    authSlice.actions;

export const getUserData = (state) => state.auth.user;
export const getUserRole = (state) => state.auth.user?.role;
export default authSlice.reducer;
