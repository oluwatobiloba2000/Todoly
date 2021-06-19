import React from 'react';
import { Box, Text, Flex, Icon, Button,CircularProgress } from '@chakra-ui/react';
import { HiCheckCircle } from "react-icons/hi";
import Nav from '../../component/navigation';
import style from './style.module.css';
import { BsCollectionFill} from "react-icons/bs";
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Dashboard = () =>{


    return <Box justifyContent="center" alignItems="center" backgroundColor="rgb(24, 24, 32)" minHeight="100vh" width="100%" paddingBottom="30px">
       
       <Nav />


        <Flex flexDirection="column" width="728px"  m="50px auto 0px" className={style.collection_container}>
                <Text color="white" ml="20px" fontWeight="bold" mb="35px" fontSize="30px">Collections</Text>

                <Flex flexWrap="wrap"  spacing={10}>

                    <Link to="/collection/1">
                        <Box className={style.collection_box}>
                                <Box backgroundColor="hsl(301deg 78% 38%)" className={style.collection_box_icon_container}>
                                    <Icon as={BsCollectionFill} color="white" fontSize="25px"/>
                                </Box>

                                <Text noOfLines={2} className={style.collection_name}>Great test collection</Text>

                                <Flex justifyContent="space-between" alignItems="center" mt="8px">
                                <Text className={style.collection_done_status}>0/2 done</Text>
        
                                    <CircularProgress value={0} size="20px" color="hsl(301deg 78% 38%)"  thickness="14px" />
                                </Flex>
                            </Box>
                    </Link>


                        <Box className={style.collection_box}>
                    
                            <Box backgroundColor="hsl(35deg 61% 48%)" className={style.collection_box_icon_container}>
                                <Icon as={BsCollectionFill} color="white" fontSize="25px"/>
                            </Box>

                            <Text noOfLines={2} className={style.collection_name}>Tasty Meals Collection</Text>
                        
                            <Flex justifyContent="space-between" alignItems="center" mt="8px">
                                <Text className={style.collection_done_status}>8/8 done</Text>

                                {/* <CircularProgress value={50} size="20px" color="hsl(35deg 61% 48%)"  thickness="14px" /> */}
                                    
                                <Icon as={HiCheckCircle} color="hsl(35deg 61% 48%)" fontSize="22px"/>
                            </Flex>
                        </Box>                    

               
                    <Box className={style.collection_box}>
                        <Box backgroundColor="hsl(107deg 78% 38%)" className={style.collection_box_icon_container}>
                            <Icon as={BsCollectionFill} color="white" fontSize="25px"/>
                         </Box>
                         <Text noOfLines={2} className={style.collection_name}>Study</Text>

                         <Flex justifyContent="space-between" alignItems="center" mt="8px">
                           <Text className={style.collection_done_status}>1/8 done</Text>
 
                            <CircularProgress value={10} size="20px" color="hsl(107deg 78% 38%)"  thickness="14px" />
                        </Flex>
                    </Box>

                    <Box className={style.collection_box}>
                         <Box backgroundColor="hsl(182deg 78% 38%)" className={style.collection_box_icon_container}>
                            <Icon as={BsCollectionFill} color="white" fontSize="25px"/>
                         </Box>

                         <Text noOfLines={2}  className={style.collection_name}>Private project</Text>
                    
                         <Flex justifyContent="space-between" alignItems="center" mt="8px">
                           <Text className={style.collection_done_status}>3/8 done</Text>
 
                            <CircularProgress value={30} size="20px" color="hsl(182deg 78% 38%)"  thickness="14px" />
                        </Flex>
                    </Box>

                    <Button id={style.add_collection_box}>
                        <Icon as={AiOutlinePlus} color="#3d3f4c" fontSize="25px"/>
                    </Button>
                </Flex>

        </Flex>

        {/* <IconButton aria-label="Add todo" icon={<SearchIcon />} /> */}
    </Box>
}

export default Dashboard;