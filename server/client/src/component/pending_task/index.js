import React, { useMemo } from 'react'
import { Flex, Text } from '@chakra-ui/react';
import Task from '../task';

function PendingTasks({ primaryCustomColor, singleCollection }) {
    const pendingTask = useMemo(() => {
        if (singleCollection && singleCollection.task) {
            let pendingTask = singleCollection.task.filter((col) => col.isCompleted === false);
            if (pendingTask) {
                return pendingTask;
            }
            return null;
        }
        return null;
    }, [singleCollection])

    return (
        (pendingTask && pendingTask.length > 0) && <Flex flexDirection="column" mb="20px">
            <Text color="white" mb="20px">Pending Tasks - {pendingTask ? pendingTask.length : 0}</Text>


            { pendingTask.map((data) => {
                return <Task dueDate={data.dueDate} status="not-completed" key={data.id} text={data.name} id={data.id}
                    primaryCustomColor={primaryCustomColor}
                />
            }
            )}
        </Flex>
    )
}

export default PendingTasks
