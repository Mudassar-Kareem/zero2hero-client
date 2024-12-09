import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    transactions: []
}

export const transactionReducer = createReducer(initialState, (builder) => {
    builder
    .addCase("getTransactionsRequest", (state) => {
        state.loading = true;
    })
    .addCase("getTransactionsSuccess", (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
    })
    .addCase("getTransactionsFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
        state.error = null;
    })
})