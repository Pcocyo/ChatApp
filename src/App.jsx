import React from 'react'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import { IconContext } from "react-icons";
import HomePage from './component/HomePage'
import Chat from './component/Chat'
import ChatBox from './component/ChatBox';
const App = () => {
  return (
    <IconContext.Provider value={{className: "global-class-name" }}>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/chat' element={<Chat/>}></Route>
            <Route path='/selectedChat' element={<ChatBox/>}></Route>
        </Routes>  
      </BrowserRouter>
    </ChakraProvider>
    </IconContext.Provider>

  )
}

export default App