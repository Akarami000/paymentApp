import { createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL= "http://localhost:8000/api"

//this is the action created using AsyncThunk 
export const CreateUser = createAsyncThunk('user/fetchUser',async(userData,{rejectWithValue})=>{
    try{
        const response = await axios.post(`${BASE_URL}/users/sign-up`,userData);
        return response.data;
    }
    catch(error){
        return rejectWithValue(error.response.data||'fail to create user');
    }
})


