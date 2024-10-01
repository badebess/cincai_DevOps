import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIEmployees } from "../../apis/APIEmployees";

export const fetchGetEmployees = createAsyncThunk(
    "fetch/getEmployees",
    APIEmployees.getEmployees
);

const initialState = {
    message : "",
    status: "idle",
    data: null,
};

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase("fetch/getEmployees/pending", (state)=>{
            state.status = "loading";
            state.message = "";
        });

        builder.addCase("fetch/getEmployees/fulfilled", (state, {payload}) => {
            state.status = "success";
            state.data = payload;
        });

        builder.addCase("fetch/getEmployees/rejected", (state, { error }) => {
            state.status = "failed";
            state.message = error.stack;
        });

    }

});

export const selectEmployees = (state) => state.employees;
export default employeesSlice.reducer;