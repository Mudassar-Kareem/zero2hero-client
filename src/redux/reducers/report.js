import { createReducer } from "@reduxjs/toolkit";

const initialState= {
    reports : []
}

export const reportReducer = createReducer(initialState,(builder)=>{
    builder
    .addCase("getReportsRequest",(state)=>{
        state.loading = true
    })
    .addCase("getReportsSuccess",(state,action)=>{
        state.loading = false
        state.reports = action.payload
    })
    .addCase("getReportsFail",(state,action)=>{
        state.loading = false
        state.error = action.payload
    })
    .addCase("clearErrors",(state)=>{
        state.error = null
    })
})