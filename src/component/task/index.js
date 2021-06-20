import React, { useState } from 'react'
import { Flex, Text, Button, IconButton, Icon, Textarea, Collapse, useBoolean } from '@chakra-ui/react';
import { BiDotsVerticalRounded, BiCheck, BiEditAlt } from 'react-icons/bi';
import { AiOutlineDelete, AiTwotoneDelete } from 'react-icons/ai';
import {
    Menu,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuButton,
    Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"
import { Spinner } from "@chakra-ui/react"

export default function Task({ status, text, id, primaryCustomColor }) {

    const [loadingChangeStatus, setloadingChangeState] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [openEdit, setOpenEdit] = useBoolean(false)

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
                                                setloadingChangeState(true);
                                                setTimeout(() => setloadingChangeState(false), 30000)

                                            }} height="20px" minWidth="20px" padding="0" border="2px solid #d854c6">
                                                <Icon as={BiCheck} color="rgb(24, 24, 32)" appearance="none" />
                                            </Button>
                                            : 
                                            <Button isLoading={loadingChangeStatus} backgroundColor="inherit" height="20px" minWidth="20px" padding="0" border={`2px solid ${primaryCustomColor}}`}
                                                onClick={() => {
                                                    setloadingChangeState(true);
                                                    setTimeout(() => setloadingChangeState(false), 30000)

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
                            <Text textDecoration="line-through" color="white" fontSize="15px" ml="10px">
                                {text && text}
                            </Text>
                            :
                            <Text color="white" fontSize="15px" ml="10px">
                                {text && text}
                            </Text>
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
                                    { status !== 'completed' && 
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
                                            setLoadingDelete(true)
                                            setTimeout(() => setLoadingDelete(false), 3000)

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
                            defaultValue={text}
                            borderRadius="5px"
                            border={`1px solid`}
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
                                    setEditLoading(true)
                                    setTimeout(() => setEditLoading(false), 3000)
                                }}
                                isLoading={editLoading} loadingText="Saving..." color="white" size="xs">
                                Save
                            </Button>

                            {editLoading ? '' : <Button colorScheme="pink" onClick={setOpenEdit.toggle} color="white" size="xs">
                                Cancel
                            </Button>}
                        </Flex>
                    </Flex>
                </Collapse>

                {/* errors arena */}
                <Collapse in={openEdit} animateOpacity>
                    <Alert status="error" 
                        borderRadius="6px"
                        marginTop="5px"
                        marginBottom="10px"
                        fontSize="12px"
                        height="35px"
                        background="#543333"
                        color="white">
                    <AlertIcon w="14px"/>
                        <AlertTitle mr={2}>No Internet</AlertTitle>
                        <AlertDescription>Looks like you are not connected.</AlertDescription>
                    {/* <Button  position="absolute" right="8px" top="8px" fontSize="10px"
                            height="18px"
                            width="18px"
                            marginRight="4px"
                            borderRadius="30px" _hover={{
                                backgroundColor: "#181820"
                            }} backgroundColor="#181820">Retry</Button> */}
                    </Alert>
                </Collapse>
            </Flex>
            )
}
