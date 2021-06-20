import React, { useState } from 'react'
import { InputGroup, Input, InputLeftElement, Flex, Button, Text, Icon, Tooltip } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import style from './style.module.css';
import DateTimePicker from 'react-datetime-picker';
import { BiCalendar, BiPlus } from 'react-icons/bi';
import Focusable from '../../HOC/focusable';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MdClear } from "react-icons/md";

dayjs.extend(relativeTime)

export default function AddTaskInput({ primaryCustomColor, getTaskValue }) {
    const [datePickerValue, setDatePickerValue] = useState("");
    const [onOpenDatePicker, setOpenDatePicker] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitTask = (data) =>{
        getTaskValue(data);
    }   


    return (
        <Focusable style={{position: 'relative'}}>
                {focus =>
                    <form onSubmit={handleSubmit(submitTask)}>
                         <InputGroup size="md">

                            <InputLeftElement zIndex="3" mt="2px" w="44px" className={style.add_task_btn_container}>
                                <Tooltip placement="top" hasArrow label="Click to add a task">
                                    <Button  type="submit" className={style.add_task_btn} color="black" fontSize="16px" minWidth="20px" p="0" height="20px" backgroundColor={primaryCustomColor} onClick={() => console.log("add task")} >
                                        <Icon as={BiPlus}/>
                                    </Button>
                                </Tooltip>
                            </InputLeftElement>

                            <Input
                                autoComplete="off"
                                id={style.add_task_input}
                                isInvalid={errors.task && errors.task.message}
                                className={`${(focus || onOpenDatePicker) && style.focusFreeze}`}
                                borderRadius="12px"
                                color="white"
                                height="45px"
                                pl="40px"
                                name="task"
                                {...register("task", {required: true})}
                                type={"text"}
                                zIndex={`${(focus || onOpenDatePicker) ? '1' : '15'}`}
                                placeholder="Add a task"
                            />
                            { <Flex flexDirection="column" transition=".3s ease .1s" zIndex="1" opacity={(focus || onOpenDatePicker) ? '1': '0'} borderTop={`1px solid #353540`} position="absolute" className={style.task_date_picker}>


                                <Flex as="span">
                                
                                    <Tooltip placement="top" hasArrow label="Click to set date">
                                        <Button fontSize="17px" id={style.add_task_due_date_icon} onClick={()=> {
                                            setOpenDatePicker(!onOpenDatePicker)}} color={primaryCustomColor}>
                                            <Icon as={BiCalendar} appearance="none" />
                                        </Button>
                                    </Tooltip>

                                    <Text className={style.add_task_due_date}>{datePickerValue ?  <> Due in : {dayjs(datePickerValue).format("D MMM YYYY [at] h [:] mm a")} <Text ml="10px" className={style.due_date_from_now_text} as="span" color={primaryCustomColor}>{dayjs(datePickerValue).fromNow()} </Text> </> : 'Set due date & time'}</Text>
                                </Flex>

                                <DateTimePicker
                                    clearIcon={MdClear({
                                        style: {
                                            color: 'white'
                                        }
                                    })}
                                    minDate={new Date()}
                                    calendarClassName="due_date_calender"
                                    className={onOpenDatePicker ? `${style.show_date_picker}`: `${style.hide_date_picker}`}
                                    onChange={setDatePickerValue}
                                    value={datePickerValue}
                                    calendarIcon={BiCalendar({
                                        style: {
                                            color: 'white'
                                        }
                                    })}
                                />
                            </Flex>}
                        </InputGroup>
             </form>
}
            </Focusable>
    )
}
