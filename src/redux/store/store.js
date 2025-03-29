import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../_slices/auth";
import messageReducer from "../_slices/message";
import patientReducer from "../_slices/patient";
import encounterReducer from "../_slices/encounter";
import inventoryReducer from "../_slices/inventory";

const reducer = {
    auth: authReducer,
    message: messageReducer,
    patient: patientReducer,
    encounter: encounterReducer,
    inventory: inventoryReducer,
}

const store = configureStore({
    reducer: reducer,
    
    //TODO remove in production
    devTools: true
})

export default store;