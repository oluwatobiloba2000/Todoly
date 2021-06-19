import React from 'react';
import { Box, Flex, Text, Image, Button } from '@chakra-ui/react';
import style from './style.module.css';
import googleLogo from '../../img/google_logo.svg';
import { useHistory } from 'react-router-dom';

const Home = () =>{
    const history = useHistory();

    return <Flex justifyContent="center" className={style.container} alignItems="center" backgroundColor="rgb(24, 24, 32)" width="100%" height="100vh">
        <Box className={style.form_container} >
            <Box borderTopLeftRadius="25px" borderTopRightRadius="25px" height="182px" borderBottomRightRadius="40%" backgroundColor="#323242" className={style.welcome_logo_dash}>
                <Text color="white" fontWeight="200" as="h5">Hi there! Welcome to</Text>
                <Text color="white" mt="10px" fontSize="35px" fontWeight="500" as="h1">Todoly</Text>
            </Box>

            <Text color="white" m="60px 20px 0px 20px" textAlign="center" fontWeight="200" as="h5">Very simple Things To-Do List.  Helps you to manage your daily life, without any hassle! </Text>

            <Flex justifyContent="center" alignItems="center" m="80px 35px 0px" className="google_auth_container">
                <Button display="flex" width="100%"
                    backgroundColor="#323242"
                    onClick={()=> history.push('/collections')}
                    _hover={{
                        border: '1px solid #ef80c0',
                        padding: '9.5px',
                        cursor: 'pointer'
                    }}
                    padding="10px"
                    borderRadius="30px">
                   <Image w="25px" src={googleLogo} alt="google" />
                   <Text paddingLeft="8px" paddingTop="2px" color="white">continue with Google</Text>
                </Button>
            </Flex>
        </Box>
    </Flex>
}

export default Home;