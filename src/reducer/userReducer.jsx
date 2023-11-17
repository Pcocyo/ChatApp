import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const logUser = createAsyncThunk('userLogin',async (userInfo)=>{
    const response = await axios.post('http://localhost:8080/api/user/login',userInfo)
    return response.data
})

export const signUser = createAsyncThunk('userSignUP', async(userInfo)=>{
    const response = await axios.post('http://localhost:8080/api/user/register',userInfo)
    return response.data
})

const userSlice = createSlice({
    name:'user',
    initialState:{
        username:'',
        _id:'',
        token:'',
    },
    reducers :{
    },
    extraReducers: (builder) => {
        builder
          .addCase(logUser.fulfilled, (state,action) => {
            state.username = action.payload.username;
            state._id = action.payload._id
            state.token = action.payload.token
          })
          .addCase(signUser.fulfilled,(state,action)=>{
            state.username = action.payload.username;
            state._id = action.payload._id
            state.token = action.payload.token
          })
        }
})

export const userReducer = userSlice.reducer