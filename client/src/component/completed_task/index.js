import React, { useState } from 'react'
import {Flex, Text} from '@chakra-ui/react';
import Task from '../task';

function CompletedTask({primaryCustomColor}) {
    const [completedTasksCount] = useState(0);

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
        <Flex flexDirection="column" mb="20px" mt="40px">
             <Text color="white" mb="20px">Completed Tasks - {completedTasksCount}</Text>

             {data.map((data, index)=>{
               return <Task status="completed" text={data.text} id={index}
                    primaryCustomColor={primaryCustomColor}
                />}
            )}
        </Flex>
    )
}

export default CompletedTask;
