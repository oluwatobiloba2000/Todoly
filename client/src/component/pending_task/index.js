import React, { useState } from 'react'
import {Flex, Text} from '@chakra-ui/react';
import Task from '../task';

function PendingTasks({primaryCustomColor}) {
    const [pendingTasksCount] = useState(0);

    const data = [{
        text: 'testing the todo app'
    },{
        text: ' It helps to hide content that'
    }, {
        text: " to create regions of content that can exp"
    }, {
        text: "to create regions of content that can exp"
    }]


    return (
        <Flex flexDirection="column" mb="20px">
             <Text color="white" mb="20px">Pending Tasks - {pendingTasksCount}</Text>

            {data.map((data, index)=>{
               return <Task status="not-completed" text={data.text} id={index}
                    primaryCustomColor={primaryCustomColor}
                />}
            )}
        </Flex>
    )
}

export default PendingTasks
