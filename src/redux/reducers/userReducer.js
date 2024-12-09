import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user:null,
    users:[]
}

export const userReducer = createReducer(initialState,(builder)=>{
    builder
    // load user reducer
    .addCase("LoadUserRequest", (state) => {
        state.loading = true;
      })
    .addCase("LoadUserSuccess", (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
    .addCase("LoadUserFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
      })

      // get all user reducer
      .addCase(("getAllUsersRequest"), (state) => {
        state.loading = true;
      })
      .addCase(("getAllUsersSuccess"), (state, action) => {
        state.loading = false,
        state.users = action.payload
      })
      .addCase(("getAllUsersFail"),(state,action)=>{
        state.loading = false,
        state.error = action.payload
      })


    .addCase("clearErrors", (state) => {
        state.error = null;
        
      });

})