import {createSlice} from '@reduxjs/toolkit';
import { CreateUser, LoginUser,fetchUserBalance,fetchUserDetails ,fetchFilterUser, transferBalance } from './action.js';

const initialState = {
    user:null,
    balance:null,
    token:null,
    loading:false,
    error:null,
    findUser:null,
    payUser:null,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        clearError(state) {
            state.error = null;
        },
        setToken(state,action){
            state.token = action.payload; //this is to store JWT token
        },
      
    clearUserState(state) {
        state.user = null;
        state.balance = null;
        state.token = null;
        state.error = null;
        state.findUser = null;
        state.payUser = null;
      },
    },
    extraReducers:(builder)=>{
        //for sing-up
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
        // for sign-in
        builder.addCase(LoginUser.pending,(state)=>{
            state.loading = true;
            state.error=null;
        }).addCase(LoginUser.fulfilled,(state,action)=>{
            state.loading= false;
            state.user = action.payload.user; //Assuming user data came from payload
            state.token = action.payload.token; // Assuming user token from payload 
        }).addCase(LoginUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        //fetchUserDetails 
        builder.addCase(fetchUserDetails.pending,(state)=>{
            state.loading = true;
            state.error = null ;
        }).addCase(fetchUserDetails.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload; // Update only user
        }).addCase(fetchUserDetails.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;

        })
        //fetchUserBalance 
        builder.addCase(fetchUserBalance.pending,(state)=>{
            state.loading = true;
            state.error = null ;
        }).addCase(fetchUserBalance.fulfilled,(state,action)=>{
            state.loading = false;
            state.balance = action.payload; //udate balance only
        }).addCase(fetchUserBalance.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            
        })

          //fetchUserUser 
        builder.addCase(fetchFilterUser.pending,(state)=>{
            state.loading = true;
            state.error = null ;
        }).addCase(fetchFilterUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.findUser = action.payload; //udate balance only
        }).addCase(fetchFilterUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            
        })

        //transferAmountToUser
        builder.addCase(transferBalance.pending,(state)=>{
            state.loading=true;
            state.error=null
        }).addCase(transferBalance.fulfilled,(state,action)=>{
            state.loading=false;
            state.payUser=action.payload;
        }).addCase(transferBalance.rejected,(state,action)=>{
            state.loading= false;
            state.error= action.payload;
        })
    }
})

export const {clearError,clearUserState} = userSlice.actions;

export default userSlice.reducer;


// •	createUser.pending sets the loading state to true when the request is being made.
// •	createUser.fulfilled sets the user data and stops loading when the request is successful.
// •	createUser.rejected sets the error message when the request fails.