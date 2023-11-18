import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./reducer/userReducer";
import { conversationReducer } from "./reducer/conversationReducer";
const store = configureStore(
    {
        reducer:{
            userReducer:userReducer,
            conversationReducer:conversationReducer
        }
    }
)

export default store