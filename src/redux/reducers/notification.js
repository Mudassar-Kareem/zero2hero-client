import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
}

export const notificationReducer = createReducer(initialState,(builder)=>{ 
    builder
    .addCase("userNotificationRequest",(state)=>{
        state.loading = true
    })
    .addCase("userNotificationSuccess",(state,action)=>{
        state.loading = false
        state.notifications = action.payload
    })
    .addCase("userNotificationFail",(state,action)=>{
        state.loading = false
        state.error = action.payload
    })

    .addCase("clearErrors", (state) => {
        state.error = null;
        
      });

    
})