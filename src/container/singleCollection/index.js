import React, { useState } from 'react';
import { Box, Text, Flex, IconButton, Menu,
    MenuList,
    MenuItem,
    MenuButton } from '@chakra-ui/react';
// import { HiCheckCircle } from "react-icons/hi";
import Nav from '../../component/navigation';
import style from './singleCollection.module.css';
import { HiDotsHorizontal } from "react-icons/hi";
import AddTaskInput from '../../component/add_task_input';
import { BiChevronLeft, BiEditAlt } from 'react-icons/bi';
import PendingTasks from '../../component/pending_task';
import { useHistory } from 'react-router-dom';
import CompletedTask from '../../component/completed_task';
import { AiOutlineDelete } from 'react-icons/ai';


export default function SingleCollection() {
    const [primaryCustomColor] = useState("#d854c6");
    const [collectionTitle] = useState("Great test collection");
    const history = useHistory();


    return (
        <Box justifyContent="center" overflowX="hidden" alignItems="center" backgroundColor="rgb(24, 24, 32)" minHeight="100vh" width="100%" paddingBottom="30px">

            <Nav />


            <Flex flexDirection="column" width="728px" m="50px auto 0px" className={style.tasks_list_container}>

                <Flex alignItems="center">

                    <IconButton
                        onClick={() => history.push('/collections')}
                        backgroundColor="#20212c"
                        aria-label="Go back"
                        _hover={{
                            // border:`2px solid ${primaryCustomColor}`,
                            backgroundColor: "#323442"
                        }}

                        _active={{
                            border: `2px solid ${primaryCustomColor}`,
                            backgroundColor: "#323442"
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
                        <Text className={style.collection_title} color="white" fontWeight="bold" fontSize="30px">{collectionTitle}</Text>

                        <Menu matchWidth={true} isLazy placement="bottom-end">
                            <MenuButton>
                                <IconButton
                                    backgroundColor="inherit"
                                    borderRadius="30px"
                                    aria-label="options"
                                    _hover={{
                                        backgroundColor: "inherit"
                                    }}

                                    _active={{
                                        backgroundColor: "inherit"
                                    }}

                                    icon={HiDotsHorizontal({
                                        style: {
                                            color: 'white',
                                            fontSize: '26px'
                                        }
                                    })}
                                />
                            </MenuButton>
                            <MenuList border="1px solid #505069" background="#20212c" color="white">
                                {/* MenuItems are not rendered unless Menu is open */}
                                <MenuItem _hover={{
                                            backgroundColor: '#3d3d52'
                                        }}
                                            _focus={{
                                                backgroundColor: '#3d3d52'
                                            }}
                                            fontSize="15px" icon={BiEditAlt({
                                                fontSize: '15px'
                                            })}>Edit Collection</MenuItem>

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
                                        >Delete Collection</MenuItem>
                            </MenuList>
                        </Menu>

                    </Flex>

                </Flex>

                <Flex flexDirection="column" pt="40px">
                    <PendingTasks primaryCustomColor={primaryCustomColor} />

                    <AddTaskInput primaryCustomColor={primaryCustomColor} getTaskValue={(value) => console.log(value)} />

                    <CompletedTask primaryCustomColor={primaryCustomColor} />
                </Flex>
            </Flex>

        </Box>
    )
}
