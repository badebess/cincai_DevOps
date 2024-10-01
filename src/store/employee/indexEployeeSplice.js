import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIEmployees } from "../../apis/APIEmployees";

export const fetchGetEmployeeById = createAsyncThunk(
    "fetch/getEmployee",
    APIEmployees.getEmployeeById
);

const initialState = {
    message : "",
    status: "idle",
    data: null,
};

const employeesSlice = createSlice({
    name: "employee",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase("fetch/getEmployee/pending", (state)=>{
            state.status = "loading";
            state.message = "";
        });

        builder.addCase("fetch/getEmployee/fulfilled", (state, {payload}) => {
            state.status = "success";
            state.data = payload;
        });

        builder.addCase("fetch/getEmployee/rejected", (state, { error }) => {
            state.status = "failed";
            state.message = error.stack;
        });

    }

});

export const selectEmployee = (state) => state.employee;
export default employeesSlice.reducer;