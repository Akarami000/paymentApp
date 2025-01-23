import { createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// const BASE_URL= "http://localhost:8000/api"
const BASE_URL= "http://eb-env-3.eba-ztd36g3v.us-east-1.elasticbeanstalk.com"

//this is the action created using AsyncThunk for Sign-up
export const CreateUser = createAsyncThunk('user/fetchUser',async(userData,{rejectWithValue})=>{
    try{
        const response = await axios.post(`${BASE_URL}/users/sign-up`,userData);
        return response.data;
    }
    catch(error){
        return rejectWithValue(error.response.data||'fail to create user');
    }
})

//Sign-in user using AsyncThung
export const LoginUser = createAsyncThunk('user/validateUser',async(userData,{rejectWithValue})=>{
    try{
        const response = await axios.post(`${BASE_URL}/users/sign-in`,userData);
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data || 'fail to login');
    }
})

export const fetchUserDetails = createAsyncThunk('user/fetchUserDetails',async(_,{rejectWithValue})=>{
    const token= localStorage.getItem('bearerToken')
    try{
        const response = await axios.get(`${BASE_URL}/users/user`,{
            headers:{
                'x-auth-token':token,
            }
        });
        return response.data.user;
        
    }
    catch(error){
        return rejectWithValue(error.response.data || 'fail to fetch data')
    }
})

export const fetchUserBalance = createAsyncThunk('user/fetchUserBalance',async(_,{rejectWithValue})=>{
    const token= localStorage.getItem('bearerToken')
    try{
        const response = await axios.get(`${BASE_URL}/users/balance`,{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        return response.data.balance;
    }
    catch(error){
        return rejectWithValue(error.response.data || "can't able to fetch Balance");
    }
})

export const fetchFilterUser = createAsyncThunk('user/fetFilterUser',async(filter,{rejectWithValue})=>{
    try{
        const response = await axios.get(`${BASE_URL}/users/find-user`, {
            params: { filter }, // Add query parameters here
          });
          return response.data;
    }
    catch(error){
        return rejectWithValue(error.response?.data || "fail to fetch Filter data");
    }
})


export const transferBalance = createAsyncThunk('user/transfer/',async(userDetails,{rejectWithValue})=>{
    const token= localStorage.getItem('bearerToken')
    try{
        const response = await axios.post(`${BASE_URL}/users/transfer`,userDetails,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Ensure the Content-Type header is included
            },
        })
        return response.data;
    }
    catch(error){

    }
})