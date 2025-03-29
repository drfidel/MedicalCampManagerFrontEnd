import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import encounterService from "../_services/encounter.service";
import { setMessage } from "./message";

const initialState = { encounters: "", error: ""  };

export const getencounters = createAsyncThunk(
    "encounter/getencounters",
    async (pgno,thunkAPI) => {
        try {
            const res = await encounterService.getAllPatientEncounters(pgno);
            return { encounters : res.results }
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

export const addencounter = createAsyncThunk(
    "encounter/addencounter",
    async({ ...fields }, thunkAPI) => {
        try {
            const response = await encounterService.addNewEncounter(fields);
            thunkAPI.dispatch( setMessage(response.statusText))
            return response
        } catch (error) {
            const message = error.response.detail
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)

export const editencounter = createAsyncThunk(
    "encounter/editencounter",
    async({ ...fields }, thunkAPI) => {
        try {
            const response = await encounterService.editEncounter(fields);
            thunkAPI.dispatch( setMessage(response.statusText) )
            return response
        } catch (error) {
            const message = error.response
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)

const encounterSlice = createSlice({
    name: "encounter",
    initialState,
    extraReducers: builder => {
        builder
        .addCase(getencounters.fulfilled, (state, action) => {
            state.encounters = action.payload;
        })
        .addCase(getencounters.rejected, (state, action) => {
            state.encounters = action.error;
        })

        .addCase(addencounter.fulfilled, (action => {
            state.success = true;
        }))

        .addCase(addencounter.rejected, (action => {
            state.success = false;
        }))

        .addCase(editencounter.fulfilled, (action => {
            state.success = true;
        }))

        .addCase(editencounter.rejected, (action => {
            state.success = false;
        }))

    },
});

const { reducer } = encounterSlice;

export default reducer;