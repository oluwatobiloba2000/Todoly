import React, { useState } from 'react';
import { Box, Text, Flex, IconButton} from '@chakra-ui/react';
// import { HiCheckCircle } from "react-icons/hi";
import Nav from '../../component/navigation';
import style from './singleCollection.module.css';
import { HiDotsHorizontal } from "react-icons/hi";
import AddTaskInput from '../../component/add_task_input';
import { BiChevronLeft } from 'react-icons/bi';
import PendingTasks from '../../component/pending_task';
import { useHistory } from 'react-router-dom';


export default function SingleCollection() {
    const [primaryCustomColor] = useState("#d854c6");
    const [collectionTitle] = useState("Great test collection");
    const history = useHistory();
    

    return (
         <Box justifyContent="center" alignItems="center" backgroundColor="rgb(24, 24, 32)" minHeight="100vh" width="100%" paddingBottom="30px">
       
        <Nav />
 
 
         <Flex flexDirection="column" width="728px"  m="50px auto 0px" className={style.tasks_list_container}>
                
                 <Flex alignItems="center">

                    <IconButton
                    onClick={()=> history.push('/collections')}
                        backgroundColor="#20212c"
                        aria-label="Go back"
                        _hover={{
                            // border:`2px solid ${primaryCustomColor}`,
                            backgroundColor:"#323442"
                        }}

                        _active={{
                            border:`2px solid ${primaryCustomColor}`,
                            backgroundColor:"#323442"
                        }}

                        icon={BiChevronLeft({
                            style: {
                                color: 'white',
                                fontSize: '30px'
                            }
                        })}
                        />

                        {/* collection title */}
                    <Flex w="100%" justifyContent="space-between" ml="20px">
                        <Text color="white" fontWeight="bold" fontSize="30px">{collectionTitle}</Text>
                        
                        <IconButton
                        backgroundColor="inherit"
                        borderRadius="30px"
                        aria-label="options"
                        _hover={{
                            backgroundColor:"inherit"
                        }}

                        _active={{
                            backgroundColor:"inherit"
                        }}

                        icon={HiDotsHorizontal({
                            style: {
                                color: 'white',
                                fontSize: '26px'
                            }
                        })}
                        />
                    </Flex>

                 </Flex>
 
                 <Flex flexDirection="column" pt="40px">
                        <PendingTasks />
                        <AddTaskInput primaryCustomColor={primaryCustomColor} getTaskValue={(value)=> console.log(value)}/>
                 </Flex>
         </Flex>
 
     </Box>
    )
}
