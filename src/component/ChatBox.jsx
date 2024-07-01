import {
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React,{useState,useEffect,useRef} from "react";

import UserTools from "./UserTools";
import chat from "./Chat.json";
import { MdOutlineSend } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import store from "../store"
import {socket,useSocket} from '../socket'


const ChatBox = () => {
  const selectedChat = useSelector((state) => state.conversationReducer.selectedChat);
  const user = useSelector((state)=>state.userReducer)



  /// automatic scroll to bottom
  const scrollContainerRef = useRef(null);
  console.log(scrollContainerRef)
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  
  return (
    <Box h="100vh" minW="450px">
      <Box mb="5px">
        <UserTools />
      </Box>
      {selectedChat ? (
        <Box bgColor="white" borderRadius="xl" w="90%" margin="auto">
          <Box overflowY="auto" h="85vh" ref={scrollContainerRef}>
            {selectedChat.message.length ? 
            selectedChat.message.map((ele,index)=>{
              return (
                <Box
                  key={index}
                  mx="10px"
                  display="flex"
                  flexDirection="column"
                  alignItems={ele.sender._id !== user._id ? "flex-start" : "flex-end"}
                >
                  <Box
                    bgColor={ele.sender._id !== user._id  ? "#C4C4C4" : "#905959"}
                    borderRadius={
                      ele.sender._id !== user._id 
                        ? "10px 10px 10px 0"
                        : "10px 10px 0px 10px"
                    }
                    my="4px"
                  >
                    <Text pt="4px" pl="4px">
                      {ele.sender.username}
                    </Text>
                    <Text p="4px">{ele.content}</Text>
                  </Box>
                </Box>
              )
            }) 
            : 
            <>no message yet</>}
          </Box>
            <MessageInput/>
          </Box>
      ) : (
        <Text w='100%' textAlign='center' fontSize='4xl'>
          select a chat
        </Text>
      )}
    </Box>
  );
};

const MessageInput = () => {
  const selectedConversation = useSelector((state)=>state.conversationReducer.selectedChat)


  useSocket('message',(data)=>{
    let newMessage = {
      content:data.content,
      conversation_id:data.conversation_id,
      reciever:data.reciever,
      sender:data.sender
    }

    let updatedConversation={
      ...data.data
    }

    if(selectedConversation._id == newMessage.conversation_id){
      store.dispatch({
        type:'coversation/SETSINGLEMESSAGE',
        payload:newMessage
      })
    }
    
    store.dispatch({
      type:'user/UPDATECONVERSATION',
      payload:updatedConversation
    })
  })
  const [chatInput,setChatInput] = useState('')
  const user = useSelector((state)=>state.userReducer)
  const conversation = useSelector((state)=>state.conversationReducer.selectedChat) 
  async function sendMessage(){
    const conversation_id = conversation._id
    const reciever = conversation.users.filter((ele)=> ele._id != user._id)
    const sender = conversation.users.filter((ele)=> ele._id == user._id)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${user.token}`, // Replace with your actual access token
  };
    const {data} = await axios.post("https://chatapp-backend-gsoh.onrender.com/api/message/createMessage",{conversation_id, reciever:reciever._id,content:chatInput},{headers})

    store.dispatch({
      type:'coversation/SETMESSAGE',
      payload:data.message
    })
    store.dispatch({
      type:'user/UPDATECONVERSATION',
      payload:data
    })
    const to_emit = {
      conversation_id, 
      reciever:reciever,
      content:chatInput,
      sender:sender,
      data:data
    }
    socket.emit('message',to_emit)
  }
  return (
    <Box h="15vh">
      <InputGroup bgColor="#DEDEDE" w="auto" mx="10px">
        <Input
          border="1px solid black"
          _hover={{ border: "1px solid black" }}
          id="chatInput"
          onChange={(e)=>setChatInput(e.target.value)}
        />
        <InputRightElement>
          <MdOutlineSend size="2em" color="#C14545" cursor="pointer" onClick={()=>sendMessage()}/>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

// chat.map((ele, index) => (
//   <Box
//     key={index}
//     mx="10px"
//     display="flex"
//     flexDirection="column"
//     alignItems={ele.sender == "User1" ? "flex-start" : "flex-end"}
//   >
//     <Box
//       bgColor={ele.sender == "User1" ? "#C4C4C4" : "#905959"}
//       borderRadius={
//         ele.sender == "User1"
//           ? "10px 10px 10px 0"
//           : "10px 10px 0px 10px"
//       }
//       my="4px"
//     >
//       <Text pt="4px" pl="4px">
//         {ele.sender}
//       </Text>
//       <Text p="4px">{ele.content}</Text>
//     </Box>
//   </Box>
// ))



export default ChatBox;
