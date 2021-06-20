import React from 'react'
import {
    Box, Image, Flex, Button, Menu,
    MenuDivider,
    MenuList,
    MenuItem,
    MenuButton,
    MenuGroup
} from '@chakra-ui/react';
import profileImg from '../../img/avataaars.png';
import { RiDashboardFill } from "react-icons/ri";
import style from './style.module.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';


export default function Nav() {
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
                        <Button id={style.nav_profile_img_btn} _active={{border: 'none'}}>
                            <Image className={style.nav_profile_img} src={profileImg} />
                        </Button>

                    </MenuButton>

                    <MenuList width="240px" border="1px solid #505069" background="#181820" color="white">
                        <MenuGroup title="Signed in as Oluwatobiloba Anani Paul" >
                            <MenuItem _hover={{
                                backgroundColor: '#3d3d52'
                            }}
                                _focus={{
                                    backgroundColor: '#3d3d52'
                                }}
                                fontSize="15px" disabled icon={BiEditAlt({
                                    fontSize: '15px'
                                })}>Account Settings</MenuItem>

                            <MenuDivider />

                            <MenuItem fontSize="15px" icon={AiOutlineDelete({
                                fontSize: "15px"
                            })}
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
                    </MenuList>
                </Menu>

            </Flex>
        </Box>
    )
}
