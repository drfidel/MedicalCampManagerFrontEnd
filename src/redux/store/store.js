import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../_slices/auth";
import messageReducer from "../_slices/message";

const reducer = {
    auth: authReducer,
    message: messageReducer
}

const store = configureStore({
    reducer: reducer,
    
    //TODO remove in production
    devTools: true
})

export default store;