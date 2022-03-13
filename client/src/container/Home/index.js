import React, { useState } from 'react';
import { Box, Flex, Text, Button, Icon, Tabs } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import style from './style.module.css';
import { useHistory } from 'react-router-dom';
import { Login, Signup } from '../../graphQl/mutation';
import {
    FormControl,
    FormLabel,
    Tab,
    Input,
    TabPanel,
    TabPanels,
    TabList,
    Collapse
} from "@chakra-ui/react";
import { HiShieldExclamation } from 'react-icons/hi';
import { FiCloudOff } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { add_user } from '../../app/slice/authSlice/auth';
import { useQuery } from '../../Hook/useQuery';
import { request } from 'graphql-request';
import { isTokenExpired, saveTokenInLocalStorage } from '../../utils/auth';
import { url } from '../..';

const Home = () => {
    const history = useHistory()
    const query = useQuery();
    const dispatch = useDispatch();
    const [{ error: loginError, loading: loginLoading }, setRequestState] = useState({
        error: null,
        loading: false
    })

    const [{ error: signupError, loading: signupLoading }, setSignupRequestState] = useState({
        error: null,
        loading: false
    })

    const { register: loginRegister, handleSubmit: submitLogin } = useForm();
    const { register: signupRegister, handleSubmit: submitSignup } = useForm();

    const login = (data) => {
        setRequestState({
            error: null,
            loading: true
        })
        request(url, Login, data)
            .then((dataFromRequest) => {
                setRequestState({
                    loading: false
                })

                saveTokenInLocalStorage(dataFromRequest.login.token);
                dispatch(add_user(dataFromRequest.login))

                const redirectUrl = query.get('rdr');
                if (redirectUrl) {
                    history.push(redirectUrl);
                } else {
                    history.push('/collections');
                }
                return <></>
            })
            .catch((e) => {
            
                if (e && e.message.indexOf("Network request") >= 0) {
                    setRequestState({
                        loading: false,
                        error: 'Network Error'
                    })
                } else {
                    setRequestState({
                        loading: false,
                        error: e && e.message
                    })
                }
            })
    }


    const signup = (data) =>{
        setSignupRequestState({
            error: null,
            loading: true
        })
        request(url, Signup, data)
            .then((dataFromRequest) => {
                setSignupRequestState({
                    loading: false
                })

                saveTokenInLocalStorage(dataFromRequest.signup.token);
                dispatch(add_user(dataFromRequest.signup))

                const redirectUrl = query.get('rdr');
                if (redirectUrl) {
                    history.push(redirectUrl);
                } else {
                    history.push('/collections');
                }
                return <></>
            })
            .catch((e) => {
                if (e && e.message.indexOf("Network request") >= 0) {
                    setSignupRequestState({
                        loading: false,
                        error: 'Network Error'
                    })
                }else if(e && e.response && e.response.errors[0]?.extensions.descriptiveMessage){
                    setSignupRequestState({
                        loading: false,
                        error: 'email already exists'
                    })
                } else {
                    setSignupRequestState({
                        loading: false,
                        error: e && e.message
                    })
                }
            })

    }

    if (!isTokenExpired()) {
        const redirectUrl = query.get('rdr');
        if (redirectUrl) {
            history.push(redirectUrl);
        } else {
            history.push('/collections');
        }
        return <></>;
    }


    const errorDiv = (error) => {
        return <Collapse in={error ? true : false}>
            <Box color="white" fontSize="11px"
                width="95%"
                margin="10px auto 0px auto"
                display="flex"
                alignItems="center"
                padding="5px" backgroundColor="#323242" borderRadius="5px" p={3} border={`${error && error.networkError ? '2px solid #e5a23e' : '2px solid #e53e3e'}`}>
                {error && error === 'Network Error' ?
                    <>
                        <Icon as={FiCloudOff} fontSize="20px" color="#e5a23e" marginRight="8px" /> Looks like you are not connected to the internet
                    </>
                    :
                    <>
                        <Icon fontSize="16px"
                            height="17px"
                            marginRight="7px"
                            color="hsl(11deg 100% 62%)"
                            as={HiShieldExclamation} /> <span>{error === 'email already exists' ? error : "Incorrect email or password"}</span>
                    </>
                }
            </Box>
        </Collapse>
    }

    return <Flex justifyContent="center" p="30px 0px" className={style.container} alignItems="center" backgroundColor="rgb(24, 24, 32)" width="100%" minHeight="100vh">
        <Box className={style.form_container} >
            <Box border={
                (loginError && loginError === 'Network Error') || (signupError && signupError === 'Network Error')
                 ? '2px solid #e5a23e' :
                    (loginError || signupError) ? '3px solid #e53e3e' : '3px solid #aa29c5'} borderTopLeftRadius="25px" borderTopRightRadius="25px" height="182px" borderBottomRightRadius="40%" backgroundColor="#323242" className={style.welcome_logo_dash}>
                <Text color="white" fontWeight="200" as="h5">Hi there! Welcome to</Text>
                <Text color="white" mt="10px" fontFamily="dusha" fontSize="35px" fontWeight="500" as="h1">Todoly</Text>
            </Box>

            <Text color="white" m="30px 20px 0px 20px" textAlign="center" fontWeight="200" as="h5">Very simple Things To-Do List.  Helps you to manage your daily life, without any hassle! </Text>

            <Tabs variant="unstyled" marginTop="13px">
                <TabList display="flex" justifyContent="center">
                    <Tab borderRadius="30px" color="white" _selected={{ bgGradient: "linear(to-l, #7928CA,#FF0080)" }}>Login</Tab>
                    <Tab borderRadius="30px" color="white" _selected={{ bgGradient: "linear(to-l, #7928CA,#FF0080)" }}>Signup</Tab>
                </TabList>
                <TabPanels>

                    {/* login panel */}
                    <TabPanel>
                        {errorDiv(loginError)}
                        <Flex color="white" justifyContent="center" alignItems="center" m="20px 0px" className={style.google_auth_container}>
                            <form onSubmit={submitLogin(login)}>
                                <FormControl id="email">
                                    <FormLabel>Email address</FormLabel>
                                    <Input fontSize="13px" type="email"   {...loginRegister("email", { required: true })} />
                                </FormControl>

                                <FormControl mt="10px" id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password"  {...loginRegister("password", { required: true })} />
                                </FormControl>

                                <Button
                                    mt={4}
                                    width="100%"
                                    colorScheme="teal"
                                    bg="#aa29c5"
                                    isLoading={loginLoading}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Flex>
                    </TabPanel>

                    {/* signup panel */}
                    <TabPanel>
                        {errorDiv(signupError)}
                        <Flex color="white" justifyContent="center" alignItems="center" m="20px 0px" className={style.google_auth_container}>
                            <form onSubmit={submitSignup(signup)}>
                                <FormControl>
                                    <FormLabel>Email address</FormLabel>
                                    <Input fontSize="13px" type="email"  {...signupRegister("email", { required: true })} />
                                </FormControl>

                                <FormControl mt="10px">
                                    <FormLabel>Firstname</FormLabel>
                                    <Input fontSize="13px" type="text"  {...signupRegister("firstName", { required: true })} />
                               
                                </FormControl>

                                <FormControl mt="10px">
                                    <FormLabel>Lastname</FormLabel>
                                    <Input fontSize="13px" type="text"  {...signupRegister("lastName", { required: true })} />
                                
                                </FormControl>

                                <FormControl mt="10px">
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password"  {...signupRegister("password", { required: true })} />
                                 
                                </FormControl>

                                <Button
                                    mt={4}
                                    width="100%"
                                    colorScheme="teal"
                                    bg="#aa29c5"
                                    isLoading={signupLoading}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>





        </Box>
    </Flex>
}

export default Home;