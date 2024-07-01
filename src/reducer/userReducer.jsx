import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const logUser = createAsyncThunk('userLogin',async (userInfo)=>{
    const response = await axios.post('https://chatapp-backend-gsoh.onrender.com/api/user/login',userInfo)
    return response.data
})

export const signUser = createAsyncThunk('userSignUP', async(userInfo)=>{
    const response = await axios.post('https://chatapp-backend-gsoh.onrender.com/api/user/register',userInfo)
    return response.data
})

const userSlice = createSlice({
    name:'user',
    initialState:{
        username:'',
        _id:'',
        token:'',
        biography:'',
        image:'',
        conversation:[],
    },
    reducers :{
      UPDATECONVERSATION:(state,action)=>{
        const convIndexToUpdate = state.conversation.findIndex(obj => obj._id === action.payload._id)
        state.conversation[convIndexToUpdate] = action.payload
      },
      NEWCONVERSATION:(state,action)=>{
        state.conversation.push(action.payload)
      }
    
    },
    extraReducers: (builder) => {
        builder
          .addCase(logUser.fulfilled, (state,action) => {
            state.username = action.payload.username;
            state._id = action.payload._id
            state.token = action.payload.token
            state.biography = action.payload.biography
            state.image= action.payload.image
            state.conversation= action.payload.conversation
          })
          .addCase(signUser.fulfilled,(state,action)=>{
            state.username = action.payload.username
            state._id = action.payload._id
            state.token = action.payload.token
            state.biography = action.payload.biography
            state.image= action.payload.image
            state.conversation= action.payload.conversation
          })
        }
})

export const userReducer = userSlice.reducer