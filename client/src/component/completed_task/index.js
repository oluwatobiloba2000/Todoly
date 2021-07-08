import React, { useMemo } from 'react'
import {Flex, Text} from '@chakra-ui/react';
import Task from '../task';

function CompletedTask({primaryCustomColor, singleCollection}) {
    const completedTasks = useMemo(() => {
        if (singleCollection && singleCollection.task) {
              let completedTask =  singleCollection.task.filter((col) => col.isCompleted === true);
              if(completedTask){
                  return completedTask;
              }
            return null;
        }
        return null;
    }, [singleCollection])


    return (
        (completedTasks && completedTasks.length > 0) && <Flex flexDirection="column" mb="20px" mt="40px">
             <Text color="white" mb="20px">Completed Tasks - {completedTasks ? completedTasks.length : 0}</Text>

             { completedTasks.map((data, index)=>{
               return <Task status="completed" text={data.name} dueDate={data.dueDate} key={data.id} id={data.id}
                    primaryCustomColor={primaryCustomColor}
                />}
            )}
        </Flex>
    )
}

export default CompletedTask;
