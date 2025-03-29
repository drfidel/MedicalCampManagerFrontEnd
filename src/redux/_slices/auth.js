
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../_services/auth.service";
import Cookies from "universal-cookie";

const cookies = new Cookies();

//get user details from cookie  
const user = cookies.get('user');



//Login slice
export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }, thunkAPI) => {
        try {
            const serverdata = await AuthService.login(username, password);
            return {user: serverdata};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

//Logout slice
export const logout = createAsyncThunk(
    "auth/logout", async () => {
    await AuthService.logout();
});


//initialauthenticationstate-correct bug on expiry of jwt
const initialState = user
    ? { isLoggedIn: true, user}
    : { isLoggedIn: false, user:null};


const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: builder => {
        builder
        .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
        .addCase(login.rejected,(state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        })
    }
});

const { reducer } = authSlice;
export default reducer;