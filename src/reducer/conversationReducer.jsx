import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const ConversationSlice = createSlice({
    name:'coversation',
    initialState:{
      selectedChat:null
    },
    reducers :{
      SELECTCHAT:(state,action)=>{
        state.selectedChat =action.payload
      },
      SETMESSAGE:(state,action)=>{
        state.selectedChat.message = action.payload
      },
      SETSINGLEMESSAGE:(state,action)=>{
        state.selectedChat.message.push(action.payload)
      }
    }
})

export const conversationReducer = ConversationSlice.reducer