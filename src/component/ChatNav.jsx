import React,{useState,useRef} from 'react'
import { Box,Input,InputGroup, InputRightElement,Button,Avatar,Text,useBreakpoint,useDisclosure,Drawer} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import store from '../store'
import {PiGooglePlayLogoFill } from "react-icons/pi";
import axios from 'axios'
import { useSelector } from 'react-redux';
import {socket,useSocket} from '../socket'

const ChatNav = () => {

  //ComponentStyling
  const Box_styl1 = {
        bgColor:'#C14545' ,
        h:'100vh' ,
        color:'white' ,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        position:'relative'
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
    const [userToSearch,setUserToSearch] = useState('')
    const user = useSelector(state=> state.userReducer)
    console.log(user)
    const [userFound,setUserFound] = useState([])
    const [open,setOpen ] = useState(false)
    async function findBtnClick(){
        const foundUser = await axios.post('https://chatapp-backend-gsoh.onrender.com/api/user/findUser',{userToFind:userToSearch,userId:user._id})
        console.log(foundUser.data)
        setUserFound(foundUser.data)
    }
    const Input_styl = {
        size:'md',
        bgColor:'white',
        color:'black',
        placeholder:'Search user',
        borderRadius:'40px',
        borderColor:'black'
    }
    async function handleClick(userToChatId){
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${user.token}`, // Replace with your actual access token
        };
        const response = await axios.post('http://localhost:8080/api/conversation/createConversation',{user_id:userToChatId},{headers})
        console.log(response.data)
        store.dispatch({
            type:'user/NEWCONVERSATION',
            payload:response.data.toReturn
          });
        setOpen(!open)
    }
    return(
        <Box
            m='2em'
            w='70%'
        >
            <InputGroup>
                <Input {...Input_styl} name="search_user" onChange={(e)=>setUserToSearch(e.target.value)}/>
                <InputRightElement color='red' h='100%' cursor='pointer' onClick={()=>{findBtnClick(); setOpen(!open)}}>
                    <PiGooglePlayLogoFill />
                </InputRightElement>
            </InputGroup>
            {open && 
            <Box position='absolute' top='0px'left='0px'bgColor='white' width='100%' overflowY='auto'
            h='100%' zIndex='1'
            borderRadius='20px'>
                <Text color='black' textAlign='center'w='100%' fontSize={'2xl'}>User Found</Text>
                {userFound && userFound.map((ele,index)=>{
                    return(   
                        <Box 
                        key={index} 
                        color='black' 
                        width='100%' 
                        display='flex' 
                        alignItems='center'
                        cursor='pointer'
                        mt='10px'
                        onClick={()=>handleClick(ele._id)}>
                            <Avatar size='md'name={ele.username}/>
                            <Text ml='10px' fontSize='lg'>{ele.username}</Text>
                        </Box>
                    )
                })}
                <Button position='absolute' right='0px' bottom='0'onClick={()=>{setOpen(!open)}}>close</Button>
            </Box>}
        </Box>
    )
}

const FriendBox = ()=>{
    const screenW = useBreakpoint()
    const navigate = useNavigate()
    const user = useSelector(state=>state.userReducer)
    const allConversation = useSelector(state=>state.userReducer.conversation)
    // store.dispatch({
    //     type:'coversation/SELECTCHAT',
    //     payload:user.conversation
    // });
    // const allConversation = useSelector(state=>[state.conversationReducer.selectedChat])
    // console.log(allConversation1)
    
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
                let currentMessage = getCurrentMessage(ele.message)

                return(
                    <Box {...Box_styl2} key={index} onClick={(screenW === 'lg' || screenW === 'md' || screenW==='xl'|| screenW ==='2xl') ? ()=>{
                            store.dispatch({
                            type:'coversation/SELECTCHAT',
                            payload:ele
                          });
                          socket.emit('join',ele._id)
                          console.log('true')} :  ()=>navigate('/selectedChat')}>
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
export default ChatNav