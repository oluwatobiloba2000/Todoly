import React, { useState } from 'react'
import { Flex, Text, Button, IconButton, Icon, Textarea, Collapse, useBoolean, useToast } from '@chakra-ui/react';
import { BiDotsVerticalRounded, BiCheck, BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete, AiTwotoneDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    Menu,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuButton,
} from "@chakra-ui/react"
import { Spinner } from "@chakra-ui/react";
import { useHistory, useParams } from 'react-router-dom';
import { request } from 'graphql-request';
import { clearTokenInLocalStorage, getTokenFromLocalStorage, isTokenExpired } from '../../utils/auth';
import { CompletedTask, deleteTaskQuery, editTaskQuery, unCompleteTaskQuery } from '../../graphQl/mutation';
import { useDispatch } from 'react-redux';
import { complete_task, delete_task, uncomplete_task, update_task } from '../../app/slice/collectionSlice/collection';
import { url } from '../..';
dayjs.extend(relativeTime)

export default function Task({ status, text, id, primaryCustomColor, dueDate }) {

    const history = useHistory();
    const {id : collectionId} = useParams();
    const [loadingChangeStatus, setloadingChangeState] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [editInputValue, setEditInputValue] = useState(text);
    const [openEdit, setOpenEdit] = useBoolean(false)
    const TokenExpired = isTokenExpired();
    const token = getTokenFromLocalStorage();
    const dispatch = useDispatch();
    const toast= useToast();

    const completeTask = () => {
        if (TokenExpired) {
            clearTokenInLocalStorage()
            history.push(`/rdr=${window.location.pathname}`)
        }

        setloadingChangeState(true)

        request(url, CompletedTask,
            {
                token,
                taskId: id
            }
        )
            .then((dataFromRequest) => {
                setloadingChangeState(false);
                dispatch(complete_task({
                    id,
                    collectionId
                }))
            })
            .catch((e) => {
                setloadingChangeState(false);
                handleError(e);
            })
    }

    const editTask = (data) => {
        if (TokenExpired) {
            clearTokenInLocalStorage()
            history.push(`/rdr=${window.location.pathname}`)
        }

        setEditLoading(true)

        request(url, editTaskQuery,
            {
                token,
                taskId: id,
                name: data
            }
        )
            .then((dataFromRequest) => {
                setEditLoading(false);
                dispatch(update_task({
                    id,
                    collectionId,
                    name: data
                }))
                setOpenEdit.off();
            })
            .catch((e) => {
                setEditLoading(false);
                handleError(e);
            })
    }


    const deleteTask = () => {
        if (TokenExpired) {
            clearTokenInLocalStorage()
            history.push(`/rdr=${window.location.pathname}`)
        }

        setLoadingDelete(true)

        request(url, deleteTaskQuery,
            {
                token,
                taskId: id
            }
        )
            .then((dataFromRequest) => {
                setLoadingDelete(false);
                dispatch(delete_task({
                    id,
                    collectionId
                }))
          
            })
            .catch((e) => {
                setLoadingDelete(false);
                handleError(e);
            })
    }

    const unCompleteTask = () => {
        if (TokenExpired) {
            clearTokenInLocalStorage()
            history.push(`/rdr=${window.location.pathname}`)
        }

        setloadingChangeState(true)

        request(url, unCompleteTaskQuery,
            {
                token,
                taskId: id
            }
        )
            .then((dataFromRequest) => {
                setloadingChangeState(false);
                dispatch(uncomplete_task({
                    id,
                    collectionId
                }))
            })
            .catch((e) => {
                setloadingChangeState(false);
                handleError(e);
            })
    }

    const handleError = (e) =>{
        if (e && e.message.indexOf('Invalid access') >= 0) {
            toast({
                position: "top",
                title: `Invalid Access`,
                status: "error",
                isClosable: true,
            })
            clearTokenInLocalStorage()
            history.push(`/rdr=${window.location.pathname}`)
        } else if (e && e.message.indexOf("Network request") >= 0) {
            toast({
                position: "top",
                title: `Network Connection Error`,
                description: "Looks like you are not connected to the internet",
                status: "warning",
                isClosable: true,
            })
        } else {
            toast({
                position: "top",
                title: "something went wrong",
                isClosable: true,
                status: "error"
            })
        }
    }

    return (
        <Flex w="100%" mt="10px" padding="5px 15px" borderRadius="8px" opacity={`${loadingDelete ? 0.8 : 1}`}
            backgroundColor={`${loadingDelete ? '#e53e3e61' : '#21212b'}`} flexDirection="column">

            <Flex justifyContent="space-between">

                <Flex alignItems="center">

                    {/* this part renders the checkboxs to complete and un-complete  */}
                    <span>
                        {
                            loadingChangeStatus ?
                                <Spinner size="sm" mt="7px" mr="5px" color="white" />
                                :
                                openEdit ?
                                    <Icon as={BiEditAlt} fontSize="18px" color="white" />
                                    :
                                    loadingDelete ?
                                        <Icon as={AiTwotoneDelete} color="white" />
                                        :
                                        status === 'completed' ?
                                            <Button backgroundColor={primaryCustomColor} onClick={() => {
                                                unCompleteTask()
                                            }} height="20px" minWidth="20px" padding="0" border={`2px solid ${primaryCustomColor}`}>
                                                <Icon as={BiCheck} color="rgb(24, 24, 32)" appearance="none" />
                                            </Button>
                                            :
                                            <Button isLoading={loadingChangeStatus} backgroundColor="inherit" height="20px" minWidth="20px" padding="0" border={`2px solid ${primaryCustomColor}`}
                                                onClick={() => {
                                                  completeTask()

                                                }}
                                                _active={{
                                                    background: 'inherit'
                                                }}
                                                _hover={{
                                                    background: 'inherit'
                                                }}>

                                            </Button>
                        }
                    </span>

                    {status === 'completed' ?
                        <Flex flexDirection="column">
                            <Text textDecoration="line-through" color="white" fontSize="15px" ml="10px">
                                {text && text}
                            </Text>
                            {dueDate && <Flex
                                opacity='0.7'
                                marginTop="5px"
                                alignItems="center"
                                borderRadius="6px"
                                color="#ff5d5d"
                                padding="3px 10px"
                                margin="5px 0 5px 10px"
                                backgroundColor="#00000000"
                                border="1px solid #883535"
                                fontSize="11px">
                                Due
                                <Text fontSize="11px" ml='2px' mr='2px'>{dayjs(dueDate).fromNow()}</Text>
                                <Text fontSize="11px">{dayjs(dueDate).format(" [at] h [:] mm a")}</Text>
                            </Flex>
                            }
                        </Flex>
                        :
                        <Flex flexDirection="column">
                            <Text color="white" fontSize="15px" ml="10px">
                                {text && text}
                            </Text>

                            {dueDate &&<Flex
                                marginTop="5px"
                                alignItems="center"
                                borderRadius="6px"
                                color="#ff5d5d"
                                padding="3px 10px"
                                margin="5px 0 5px 10px"
                                backgroundColor="#00000000"
                                border="1px solid #883535"
                                fontSize="11px">
                                Due
                                <Text fontSize="11px" ml='2px' mr='2px'>{dayjs(dueDate).fromNow()}</Text>
                                <Text fontSize="11px">{dayjs(dueDate).format(" [at] h [:] mm a")}</Text>
                            </Flex>
                            }
                        </Flex>
                    }
                </Flex>

                {
                    loadingDelete ?
                        <Spinner size="sm" m="11px 0px" color="white"
                        />
                        :
                        <Menu matchWidth={true} size="md" isLazy={true} placement="top-end">
                            <MenuButton as={IconButton} backgroundColor="inherit" borderRadius="30px" aria-label="options"
                                _hover={{
                                    backgroundColor: "inherit"
                                }}

                                _active={{
                                    backgroundColor: "inherit"
                                }}

                                icon={BiDotsVerticalRounded({
                                    style: {
                                        color: 'white',
                                        fontSize: '19px'
                                    }
                                })}
                            />
                            <MenuList minWidth="155px" border="1px solid #505069" background="#20212c" color="white">
                                <MenuGroup>
                                    {status !== 'completed' &&
                                        <MenuItem _hover={{
                                            backgroundColor: '#3d3d52'
                                        }}
                                            _focus={{
                                                backgroundColor: '#3d3d52'
                                            }}
                                            fontSize="15px" icon={BiEditAlt({
                                                fontSize: '15px'
                                            })} onClick={() => {
                                                setOpenEdit.toggle();

                                            }}>Edit</MenuItem>
                                    }
                                    <MenuItem fontSize="15px" icon={AiOutlineDelete({
                                        fontSize: "15px"
                                    })} onClick={() => {
                                        deleteTask()
                                    }}
                                        color="#ff7150" _hover={{
                                            backgroundColor: "#cf3917",
                                            color: "white"
                                        }}
                                        _focus={{
                                            backgroundColor: "#cf3917",
                                            color: "white"
                                        }}
                                    >Delete</MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                }

            </Flex>

            {/* edit  */}
            <Collapse in={openEdit} animateOpacity>
                <Flex mt="10px" color="white" flexDirection="column">
                    <Textarea
                        value={editInputValue}
                        borderRadius="5px"
                        border={`1px solid`}
                        onChange={(e)=> setEditInputValue(e.target.value)}
                        borderColor="gray"
                        size="sm"
                        height="80px"
                        resize={'none'}
                    />

                    <Flex justifyContent="space-between" mt="15px">
                        <Button backgroundColor={primaryCustomColor} _hover={{
                            backgroundColor: primaryCustomColor
                        }}
                            onClick={() => {
                                editTask(editInputValue)
                            }}
                            isLoading={editLoading} loadingText="Saving..." color="white" size="xs">
                            Save
                        </Button>

                        {editLoading ? '' : <Button colorScheme="pink" onClick={()=> {
                            setOpenEdit.toggle()
                            setEditInputValue(text)
                            }} color="white" size="xs">
                            Cancel
                        </Button>}
                    </Flex>
                </Flex>
            </Collapse>

            {/* errors arena */}
            <Collapse in={openEdit} animateOpacity>
                {/* <Alert className={style.error} status="error"
                    borderRadius="6px"
                    marginTop="5px"
                    marginBottom="10px"
                    fontSize="12px"
                    height="35px"
                    background="#543333"
                    color="white">
                    <AlertIcon w="14px" />
                    <AlertTitle mr={2}>No Internet</AlertTitle>
                    <AlertDescription>Looks like you are not connected.</AlertDescription> */}
                    {/* <Button  position="absolute" right="8px" top="8px" fontSize="10px"
                            height="18px"
                            width="18px"
                            marginRight="4px"
                            borderRadius="30px" _hover={{
                                backgroundColor: "#181820"
                            }} backgroundColor="#181820">Retry</Button> */}
                {/* </Alert> */}
            </Collapse>
        </Flex>
    )
}
