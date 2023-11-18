import React,{useEffect} from 'react'
import { Box,Input,InputGroup, InputRightElement,Button,Avatar,Text,useBreakpoint} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

import message from'./message_user.json'
import {PiGooglePlayLogoFill } from "react-icons/pi";
import { useSelector } from 'react-redux';
const ChatNav = () => {

  //ComponentStyling
  const Box_styl1 = {
        bgColor:'#C14545' ,
        h:'100vh' ,
        color:'white' ,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }
   //ComponentStylingEnd 
  return ( 
    <Box {...Box_styl1}>
        <FindUser/>
        <FriendBox/>
    </Box>
  )
}

const FindUser = ()=>{
    
    const Input_styl = {
        size:'md',
        bgColor:'white',
        color:'black',
        placeholder:'Search user',
        borderRadius:'40px',
        borderColor:'black'
    }
    return(
        <Box
            m='2em'
            w='70%'
        >
            <InputGroup>
                <Input {...Input_styl} name="search_user"/>
                <InputRightElement color='red' h='100%' onClick={()=>console.log('hello')}>
                    <PiGooglePlayLogoFill />
                </InputRightElement>
            </InputGroup>
            
        </Box>
    )
}
const FriendBox = ()=>{
    const screenW = useBreakpoint()
    const navigate = useNavigate()
    const user = useSelector(state=>state.userReducer)
    console.log(user)
    const allConversation = useSelector(state=>state.userReducer.conversation)
    console.log(allConversation)
    const Box_styl1={
        w:'95%',
        display:'flex' ,
        alignItems:'center',
        flexDirection:'column'
    }
    const Box_styl2 = {
        cursor:'pointer',
        display:'flex',
        borderBottom:'1px solid white',
        p:'15px',
        alignItems:'center',
        gap:'5'
    }
    return(
        <Box {...Box_styl1} className='custom-scrollbar'>
        {allConversation.length ? 
                <Box w='80%' h='90%'>
                {allConversation.map((ele,index)=>{
                function friendName(array){
                    for (let i of array){
                        if(i._id !== user._id) return i
                    }
                }
                function getCurrentMessage(array){
                    let len = array.length
                    return array[len-1]
                }
                const friend = friendName(ele.users)
                const currentMessage = getCurrentMessage(ele.message)
                return(
                    <Box {...Box_styl2} key={index} onClick={(screenW === 'lg' || screenW === 'md' || screenW==='xl'|| screenW ==='2xl') ? ()=>{console.log(ele);console.log('true')} :  ()=>navigate('/selectedChat')}>
                        <Avatar size='md'name={friend.username}/>
                        <Box>
                                <Text fontSize='xl' fontStyle='bold'fontWeight='500' >{friend.username}</Text>
                                {currentMessage && ele.message.len != 0 ? <Text fontSize='sm'>{currentMessage.content}</Text>:<Text fontSize='sm'></Text>}
                        </Box>
                    </Box>
                )})}
            </Box>
            : 
            <Text>no conversation yet search to add</Text>}
        </Box>
    )
}

{/* <Box {...Box_styl2} key={index} onClick={(screenW === 'lg' || screenW === 'md' || screenW==='xl'|| screenW ==='2xl') ? ()=>{console.log('true')} :  ()=>navigate('/selectedChat')}>
                        <Avatar size='md'name={ele.username}/>
                        <Box>
                            <Text fontSize='xl' fontStyle='bold'fontWeight='500' >{ele.username}</Text>
                            <Text fontSize='sm'>{ele.currentMessage}</Text>
                        </Box>
                    </Box> */}
export default ChatNav