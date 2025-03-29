import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import inventoryService from "../_services/inventory.service";
import { setMessage } from "./message";

const initialState = { inventory: "", error: ""  };

export const getinventories = createAsyncThunk(
    "inventory/getinventories",
    async (pgno,thunkAPI) => {
        try {
            const res = await inventoryService.getAllInventories(pgno);
            return { inventory : res.results }
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

export const addinventory = createAsyncThunk(
    "inventory/addinventory",
    async({ ...fields }, thunkAPI) => {
        try {
            const response = await inventoryService.addNewInventory(fields);
            thunkAPI.dispatch( setMessage(response.statusText))
            return response
        } catch (error) {
            const message = error.response.detail
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)

export const editinventory = createAsyncThunk(
    "inventory/editinventory",
    async({ ...fields }, thunkAPI) => {
        try {
            const response = await inventoryService.editInventory(fields);
            thunkAPI.dispatch( setMessage(response.statusText) )
            return response
        } catch (error) {
            const message = error.response
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    extraReducers: builder => {
        builder
        .addCase(getinventories.fulfilled, (state, action) => {
            state.inventory = action.payload;
        })
        .addCase(getinventories.rejected, (state, action) => {
            state.inventory = action.error;
        })

        .addCase(addinventory.fulfilled, (action => {
            state.success = true;
        }))

        .addCase(addinventory.rejected, (action => {
            state.success = false;
        }))

        .addCase(editinventory.fulfilled, (action => {
            state.success = true;
        }))

        .addCase(editinventory.rejected, (action => {
            state.success = false;
        }))

    },
});

const { reducer } = inventorySlice;

export default reducer;