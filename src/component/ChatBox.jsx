import { Box,Text,Input,InputGroup,InputRightElement} from '@chakra-ui/react'
import React from 'react'

import UserTools from './UserTools'
import chat from './Chat.json'
import { MdOutlineSend } from "react-icons/md";
const ChatBox = () => {
  console.log(chat)
  return (
    <Box h='100vh' minW='450px'>
        <Box mb='5px'>
            <UserTools/>
        </Box>
        <Box bgColor='white' borderRadius="xl" w='90%' margin='auto' >
                <Box overflowY='auto' h='85vh'>
                {
                  chat.map((ele,index)=>(
                    <Box key={index}
                    mx='10px'
                    display='flex'
                    flexDirection='column'
                    alignItems={ele.sender == 'User1'? 'flex-start':'flex-end'}
                    >
                      <Box bgColor={ele.sender == 'User1'? '#C4C4C4':'#905959'}
                      borderRadius={ele.sender == 'User1'? "10px 10px 10px 0":'10px 10px 0px 10px'}
                      my='4px'
                      >
                        <Text pt='4px' pl='4px'>{ele.sender}</Text>
                        <Text p='4px'>{ele.content}</Text>
                      </Box>
                    </Box>
                  ))
                }
                </Box>
          <Box h='15vh'>
            <InputGroup bgColor='#DEDEDE' w='auto' mx='10px'>
              <Input  border='1px solid black' _hover={{border:'1px solid black'}} id='chatInput'/>
              <InputRightElement>
                <MdOutlineSend size='2em' color='#C14545' cursor='pointer'/>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
        
    </Box>
  )
}

export default ChatBox