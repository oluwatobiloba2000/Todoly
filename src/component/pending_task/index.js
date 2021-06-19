import React, { useState } from 'react'
import {Flex, Text, Button, IconButton} from '@chakra-ui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

function PendingTasks() {
    const [pendingTasksCount] = useState(0);

    return (
        <Flex flexDirection="column" mb="20px">
             <Text color="white" mb="20px">Pending Tasks - {pendingTasksCount}</Text>

            <Flex w="100%" mt="10px" padding="5px 15px" borderRadius="8px" backgroundColor="#21212b" justifyContent="space-between">
                <Flex alignItems="center">
                    <Button  backgroundColor="inherit"
                                height="20px"
                                minWidth="20px"
                                padding="0" border="2px solid #d854c6">
                    </Button>

                    <Text color="white" fontSize="15px" ml="10px">
                        Buy food and read Biology
                    </Text>
                </Flex>

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

                        icon={BiDotsVerticalRounded({
                            style: {
                                color: 'white',
                                fontSize: '19px'
                            }
                        })}
                        />
            </Flex>

            <Flex w="100%" padding="5px 15px" mt="10px" borderRadius="8px" backgroundColor="#21212b" justifyContent="space-between">
                <Flex alignItems="center">
                    <Button  backgroundColor="inherit"
                                height="20px"
                                minWidth="20px"
                                padding="0" border="2px solid #d854c6">
                    </Button>

                    <Text color="white" fontSize="15px" ml="10px">
                        Go and play
                    </Text>
                </Flex>

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

                        icon={BiDotsVerticalRounded({
                            style: {
                                color: 'white',
                                fontSize: '19px'
                            }
                        })}
                        />
            </Flex>
        </Flex>
    )
}

export default PendingTasks
