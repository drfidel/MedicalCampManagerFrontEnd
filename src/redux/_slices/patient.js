import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PatientService from "../_services/patient.service";
import { setMessage } from "./message";

const initialState = { patients : "", error: "" };

export const getpatients = createAsyncThunk(
    "patient/getpatients",
    async (pgno,thunkAPI) => {
        try {
            const res = await PatientService.getAllPatientsInfo(pgno);
            return { patients: res.results }
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
)

export const addpatient = createAsyncThunk( 
    "patient/addpatient",
    async({ ...fields }, thunkAPI) => {
        try {
            const response = await PatientService.addNewPatient(fields);
            thunkAPI.dispatch( setMessage(response.statusText) )
            return response
        } catch (error) {
            const message = error.response.detail
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)

export const editpatient = createAsyncThunk(
    "patient/editpatient",
    async({ ...fields }, thunkAPI) => {
        try {
            const response = await PatientService.editPatient(fields);
            thunkAPI.dispatch( setMessage(response.statusText) )
            return response
        } catch (error) {
            const message = error.response
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)

const patientSlice = createSlice({
    name: "patient",
    initialState,
    extraReducers: builder =>  {
        builder
        .addCase(getpatients.fulfilled,(state, action) => {
            state.patients = action.payload.patients;
        })

        .addCase(getpatients.rejected, (state, action) => {
            state.error = action.error;
        })

        .addCase(addpatient.fulfilled, (action => {
                state.success = true;
        }))

        .addCase(addpatient.rejected, (action => {
            state.success = false;
        }))

        .addCase(editpatient.fulfilled, (action => {
            state.success = true;
        }))

        .addCase(editpatient.rejected, (action => {
            state.success = false;
        }))

    },
});

const { reducer } = patientSlice;

export default reducer;