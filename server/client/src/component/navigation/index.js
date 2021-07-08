import React from 'react'
import {
    Box, Image, Flex, Button, Menu,
    MenuDivider,
    MenuList,
    MenuItem,
    MenuButton,
    MenuGroup
} from '@chakra-ui/react';
import profileImg from '../../img/empty_profile_pics_v1.png';
import { RiDashboardFill } from "react-icons/ri";
import style from './style.module.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { clearTokenInLocalStorage } from '../../utils/auth';
import { useHistory } from 'react-router-dom';
import { clear_collection } from '../../app/slice/collectionSlice/collection';
import { clear_user } from '../../app/slice/authSlice/auth';


export default function Nav() {
    const user = useSelector(state => state.user);
    const history = useHistory();
    const dispatch = useDispatch();



    return (
        <Box as="header" position="relative" h="62px" display="flex" backgroundColor="#20212C" justifyContent="space-between">

            <Box as="nav" className={style.dash_nav}>
                {/* <IconButton aria-label="open side bar" icon={AiOutlineBars()} /> */}

                <Button fontSize="17px" m="0 0 0 10px" _hover={{
                    backgroundColor: "inherit",
                    opacity: '0.7'
                }} color="white" backgroundColor="inherit" leftIcon={RiDashboardFill({ className: `${style.dashboard_icon}` })}>Dashboard</Button>

                {/* <Button fontSize="17px" ml="5px" _hover={{
                    backgroundColor: "inherit",
                    opacity: '0.7'
                }} color="white" backgroundColor="inherit" leftIcon={BsCollectionFill({ className: `${style.collection_icon}`})}>Collections</Button> */}

            </Box>

            <Flex alignItems="center">
                {/* <IconButton id={style.nav_add_collection_btn} icon={BsPlus()} /> */}



                <Menu placement="bottom-end">

                    <MenuButton
                        margin="10px 20px" borderRadius="30px"
                        _expanded={{
                            border: '1px solid #46465c',
                            borderRadius: '30px'
                        }}
                    >
                        <Button id={style.nav_profile_img_btn} _active={{ border: 'none' }}>
                            <Image className={style.nav_profile_img} src={profileImg} />
                        </Button>

                    </MenuButton>

                    <MenuList width="240px" minH="100px" border="1px solid #505069" background="#181820" color="white">
                    {
                        // loading
                        //     ?
                        //     <Flex justifyContent="center" h="100px" alignItems="center">
                        //         <ImpulseSpinner size={50} />
                        //     </Flex>
                        //     :
                        //     error ?
                        //         <Flex justifyContent="center" flexDirection="column" alignItems="center">
                        //             <Text color="white">An error occured</Text>
                        //             <Button mt="10px" color="white" borderRadius="20px" fontFamily="dusha" bgGradient="linear(to-l, #7928CA, #FF0080)"
                        //                 _hover={{ bgGradient: "linear(to-l, #3f1669, #dc0f76)" }}
                        //                 _active={{ bgGradient: "linear(to-l, #3f1669, #dc0f76)" }}
                        //                 onClick={() => fetchUser({
                        //                     variables: {
                        //                         token
                        //                     }
                        //                 })}
                        //                 leftIcon={BsArrowCounterclockwise({ style: { color: 'white', fontSize: "20px" } })}>
                        //                 Retry
                        //             </Button>
                        //         </Flex>
                        //         :
                                    <MenuGroup title={`Signed in as ${user.data && `${user.data.firstName || ''} ${user.data.lastName || ''}`}`} >
                                        <MenuItem
                                            _hover={{
                                                backgroundColor: '#808080b0'
                                            }}
                                            disabled={true}
                                            opacity={0.2}
                                            cursor="not-allowed"
                                            _focus={{
                                                backgroundColor: '#808080b0'
                                            }}
                                            backgroundColor="#808080b0"

                                            fontSize="15px" icon={BiEditAlt({
                                                fontSize: '15px'
                                            })}>Account Settings</MenuItem>

                                        <MenuDivider />

                                        <MenuItem fontSize="15px" icon={AiOutlineDelete({
                                            fontSize: "15px"
                                        })}
                                            onClick={() => {
                                                clearTokenInLocalStorage();
                                                dispatch(clear_collection());
                                                dispatch(clear_user())
                                                history.push('/')
                                            }}
                                            color="#ff7150" _hover={{
                                                backgroundColor: "#cf3917",
                                                color: "white"
                                            }}
                                            _focus={{
                                                backgroundColor: "#cf3917",
                                                color: "white"
                                            }}
                                        >Logout</MenuItem>
                                    </MenuGroup>
                    }
                    </MenuList>
                </Menu>

            </Flex>
        </Box>
    )
}
