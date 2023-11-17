import React from 'react'

import ChatBox from './ChatBox'
import ChatNav from './ChatNav'
import { Box, Grid, GridItem,useBreakpoint } from '@chakra-ui/react'

const Chat = () => {
  const screenW = useBreakpoint()
  console.log(screenW)
  return (
    <Box h='100vh' w='100%' bgColor='#EDDFE2' >
      {(screenW === 'lg' || screenW === 'md' || screenW==='xl'|| screenW ==='2xl') &&
        <Grid
        templateColumns='repeat(6,1fr)'>
          <GridItem colSpan={2}>
            <ChatNav/>
          </GridItem>
          <GridItem colSpan={4}>
            <ChatBox/>
          </GridItem>
        </Grid>
      }
      <Box minW='450px'>
        <ChatNav/>
      </Box>
      
    </Box>
  )
}



export default Chat