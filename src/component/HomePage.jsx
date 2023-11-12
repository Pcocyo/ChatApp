import React,{useState} from 'react'
import { Grid,GridItem,Box,useBreakpointValue, Input,Heading, Button,Text} from '@chakra-ui/react'




const SignUp = (props)=>{
  const screenWidth = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' })

  const inputStyle = {
    variant: 'filled',
    autoComplete: 'true',
    borderColor: '#bdc3c7w',
    w: '50%',
    mt: '0.8rem',
  };
  const passwordStyle=
  {
    variant: 'filled',
    autoComplete: 'true',
    borderColor: '#bdc3c7w',
    w: '50%',
    mt: '0.8rem',
    type: {}
  }
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [cPassword,setcPassword] = useState('')
  function BtnClick(){
    //what happen if they clicked on sign up button
  }
  return(
    <Box p='20px' display='flex' justifyContent='center' h='100%' alignItems='center'  flexDir='column' bgColor='white'>

        <Heading size='xl' mb='14px'> Sign up</Heading>

        <Input onChange={(e)=>setUserName(e.target.value)} {...inputStyle} id='userName' placeholder='UserName'></Input>

        <Input onChange={(e)=>setPassword(e.target.value)} {...passwordStyle} id='password' placeholder='Password'></Input>

        <Input onChange={(e)=>{setcPassword(e.target.value)}}{...passwordStyle} id='confirmPassword'placeholder='Confirm Password'></Input>

        <Button onClick={(e)=>{BtnClick()}}colorScheme='red' mt='0.8rem' w='40%'>Sign Up</Button>

        <Text mt='10px'>Have an account? <i onClick={(e)=>props.props.setLogin(!props.props.login)}
        style={{textDecoration:'underline',cursor:'pointer',block:'inline'}}>Log in</i></Text>

    </Box>
  )
}

const Login = (props)=>{
  const inputStyle = {
    variant: 'filled',
    autoComplete: 'true',
    borderColor: '#bdc3c7w',
    w: '50%',
    mt: '0.8rem',
  };
  const passwordStyle=
  {
    variant: 'filled',
    autoComplete: 'true',
    borderColor: '#bdc3c7w',
    w: '50%',
    mt: '0.8rem',
    type: {}
  }
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')


  function BtnClick(){

  }
  return(
    <Box p='20px' display='flex' justifyContent='center' h='100%' alignItems='center'  flexDir='column' bgColor='white'>

        <Heading size='xl' mb='14px'> Log in</Heading>

        <Input onChange={(e)=>setUserName(e.target.value)} {...inputStyle} id='userName' placeholder='UserName'></Input>

        <Input onChange={(e)=>setPassword(e.target.value)} {...passwordStyle} id='password' placeholder='Password'></Input>

        <Button onClick={(e)=>{BtnClick()}}colorScheme='red' mt='0.8rem' w='40%'>Log In</Button>

        <Text mt='10px'>Dont Have An Account? <i onClick={(e)=>props.props.setLogin(!props.props.login)}
        style={{textDecoration:'underline',cursor:'pointer',block:'inline'}}>Register</i></Text>
    </Box>
  )
}
const HomePage = () => {
  const screenWidth = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' })
  let [login,setLogin] = useState(false)
  return (

    <Box bgColor='#C14545' display='flex' flexDirection='column' h='100vh' minWidth='500px'>
            {(screenWidth === 'lg' || screenWidth === 'xl') && (
                    <Box>
                    <Grid
                        templateColumns={{lg: 'repeat(5, 1fr)'}}
                        h='100vh'
                    >
                        <GridItem colSpan={{ lg: 3 }} bgColor='#C14545'></GridItem>
                        <GridItem colSpan={{ lg: 2 }}>
                          {login ? <Login props={{login,setLogin}}/>:<SignUp props={{login,setLogin}}/>}
                        </GridItem>
                    </Grid>
                    </Box>
                )}
              <Box p='20%' px='10%'>
              {login ? <Login props={{login,setLogin}}/>:<SignUp props={{login,setLogin}}/>}
                  
              </Box>
    </Box>        
  )
}


export default HomePage