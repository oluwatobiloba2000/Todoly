import React from 'react'
import { Box, Image, Flex, Button, IconButton } from '@chakra-ui/react';
import profileImg from '../../img/avataaars.png';
import { RiDashboardFill } from "react-icons/ri";
import { BsPlus} from "react-icons/bs";
import style from './style.module.css';


export default function Nav() {
    return (
        <Box as="header" display="flex" backgroundColor="#20212C" justifyContent="space-between">

          <Box as="nav" className={style.dash_nav}>
           {/* <IconButton aria-label="open side bar" icon={AiOutlineBars()} /> */}

            <Button fontSize="17px" m="0 0 0 10px" _hover={{
                backgroundColor: "inherit",
                opacity: '0.7'
            }} color="white" backgroundColor="inherit" leftIcon={RiDashboardFill({ className: `${style.dashboard_icon}`})}>Dashboard</Button>
         
            {/* <Button fontSize="17px" ml="5px" _hover={{
                    backgroundColor: "inherit",
                    opacity: '0.7'
                }} color="white" backgroundColor="inherit" leftIcon={BsCollectionFill({ className: `${style.collection_icon}`})}>Collections</Button> */}
         
          </Box>
          
            <Flex alignItems="center">
                <IconButton id={style.nav_add_collection_btn}  icon={BsPlus()}/>
                <Button id={style.nav_profile_img_btn}>
                    <Image className={style.nav_profile_img} src={profileImg}/>
                </Button>
            </Flex>
        </Box> 
    )
}
