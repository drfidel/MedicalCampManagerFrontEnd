import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PatientService from "../_services/patient.service";
import { setMessage } from "./message";

const initialState = {};

const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {

        setPatient: (state, action) => {
            return { patient: action.payload };
        },

        clearPatient: () => {
            return { patient: "" };
        },
    },
});

const { reducer, actions } = patientSlice;

export const { setPatient, clearPatient } = actions

export default reducer;