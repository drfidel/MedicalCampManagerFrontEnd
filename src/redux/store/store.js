import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../_slices/auth";
import messageReducer from "../_slices/message";
import patientReducer from "../_slices/patient";

const reducer = {
    auth: authReducer,
    message: messageReducer,
    patient: patientReducer,
}

const store = configureStore({
    reducer: reducer,
    
    //TODO remove in production
    devTools: true
})

export default store;