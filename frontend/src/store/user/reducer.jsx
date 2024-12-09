import {createSlice} from '@reduxjs/toolkit';
import { CreateUser, LoginUser } from './action';

const initialState = {
    user:null,
    loading:false,
    error:null,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(CreateUser.pending,(state)=>{
            state.loading=true;
            state.error=null
        }).addCase(CreateUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload;
        }).addCase(CreateUser.rejected,(state,action)=>{
            state.loading= false;
            state.error= action.payload;
        })
        
        builder.addCase(LoginUser.pending,(state)=>{
            state.loading = true;
            state.error=null;
        }).addCase(LoginUser.fulfilled,(state,action)=>{
            state.loading= false;
            state.user = action.payload;
        }).addCase(LoginUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default userSlice.reducer;


// •	createUser.pending sets the loading state to true when the request is being made.
// •	createUser.fulfilled sets the user data and stops loading when the request is successful.
// •	createUser.rejected sets the error message when the request fails.