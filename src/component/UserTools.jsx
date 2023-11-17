import React from 'react'
import { PiBellThin } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { Box,useBreakpoint } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const UserTools = () => {
  const screenW = useBreakpoint()
  const navigate = useNavigate()
  return (
    <Box display='flex' justifyContent={(screenW === 'lg' || screenW === 'md' || screenW==='xl'|| screenW ==='2xl')?'flex-end':'space-between'} mt='4px' >
          {(screenW === 'lg' || screenW === 'md' || screenW==='xl'|| screenW ==='2xl') ?
            (
              <>
                <PiBellThin size='2em' cursor='pointer'/>
                <CiUser size='2em'cursor='pointer'/>
              </>
            ):
            (
              <>
                <Box>
                  <IoIosArrowBack size='2em' cursor='pointer' onClick={()=>navigate('/chat')}/>
                </Box>
                
                <Box display='flex'>
                  <PiBellThin size='2em' cursor='pointer'/>
                  <CiUser size='2em'cursor='pointer'/>
                </Box>
              </>
              
            )
          }
          
    </Box>
  )
}

export default UserTools