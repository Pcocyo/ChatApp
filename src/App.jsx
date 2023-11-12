import React from 'react'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'

import HomePage from './component/HomePage'
const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
        </Routes>  
      </BrowserRouter>
    </ChakraProvider>

  )
}

export default App