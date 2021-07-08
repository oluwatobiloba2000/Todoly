import React, { useState } from 'react'
import { InputGroup, Input, InputLeftElement, Flex, Button, Text, Icon, Tooltip, useToast } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import style from './style.module.css';
import DateTimePicker from 'react-datetime-picker';
import { BiCalendar, BiPlus } from 'react-icons/bi';
import Focusable from '../../HOC/focusable';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MdClear } from "react-icons/md";
import { SpiralSpinner } from 'react-spinners-kit';
import { CreateTaskQuery } from '../../graphQl/mutation';
import { request } from 'graphql-request';
import { clearTokenInLocalStorage, getTokenFromLocalStorage, isTokenExpired } from '../../utils/auth';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { push_new_task } from '../../app/slice/collectionSlice/collection';
import { url } from '../..';

dayjs.extend(relativeTime)

export default function AddTaskInput({ primaryCustomColor, collectionId }) {
    const [datePickerValue, setDatePickerValue] = useState("");
    const [onOpenDatePicker, setOpenDatePicker] = useState(false)
    const { register, handleSubmit, reset ,formState: { errors } } = useForm();
    const [{loading}, setRequestState] = useState({
        loading: false
    })
    const history = useHistory()
    
    const TokenExpired = isTokenExpired();
    const token = getTokenFromLocalStorage();
    const dispatch = useDispatch()
    const toast = useToast();

    const submitTask = (data) => {
        if(TokenExpired){
            clearTokenInLocalStorage()
            history.push(`/rdr=${window.location.pathname}`)
        }

        setRequestState({
            loading: true
        })

        request(url, CreateTaskQuery, 
              {
                token,
                name: data.name,
                collectionId,
                dueDate: datePickerValue
            }
        )
        .then((dataFromRequest) => {
            setRequestState({
                loading: false
            })
            dispatch(push_new_task({
                ...dataFromRequest.createTask,
                collectionId
            }))
            reset()
            setDatePickerValue("");
        })
        .catch((e)=>{
          setRequestState({
                loading: false
              })

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
                    title:"something went wrong",
                    isClosable: true,
                    status: "error"
                })
              }
        })
    }


    return (
        <>
        {loading && <Flex justifyContent="center" m="20px 0">
             <SpiralSpinner size={60}  loading={true}/>
        </Flex>}

            <Focusable style={{ position: 'relative' }}>
                {focus =>
                    <form onSubmit={handleSubmit(submitTask)}>
                        <InputGroup size="md">

                            <InputLeftElement zIndex="3" mt="2px" w="44px" className={style.add_task_btn_container}>
                                <Tooltip placement="top" hasArrow label="Click to add a task">
                                    <Button type="submit" isLoading={loading} className={style.add_task_btn} color="black" fontSize="16px" minWidth="20px" p="0" height="20px" backgroundColor={primaryCustomColor} >
                                        <Icon as={BiPlus} />
                                    </Button>
                                </Tooltip>
                            </InputLeftElement>

                            <Input
                                autoComplete="off"
                                id={style.add_task_input}
                                isInvalid={errors.task && errors.task.message}
                                className={`${(focus || onOpenDatePicker) && style.focusFreeze}`}
                                borderRadius="12px"
                                _focus={{ boxShadow: `0 0 0 2px ${primaryCustomColor}` }}
                                color="white"
                                height="45px"
                                pl="40px"
                                name="task"
                                {...register("name", { required: true })}
                                type={"text"}
                                zIndex={`${(focus || onOpenDatePicker) ? '1' : '15'}`}
                                placeholder="Add a task"
                            />
                            {<Flex flexDirection="column" transition=".3s ease .1s" zIndex="1" opacity={(focus || onOpenDatePicker) ? '1' : '0'} borderTop={`1px solid #353540`} position="absolute" className={style.task_date_picker}>


                                <Flex as="span">

                                    <Tooltip placement="top" hasArrow label="Click to set date">
                                        <Button fontSize="17px" id={style.add_task_due_date_icon} onClick={() => {
                                            setOpenDatePicker(!onOpenDatePicker)
                                        }} color={primaryCustomColor}>
                                            <Icon as={BiCalendar} appearance="none" />
                                        </Button>
                                    </Tooltip>

                                    <Text className={style.add_task_due_date}>{datePickerValue ? <> Due in : {dayjs(datePickerValue).format("D MMM YYYY [at] h [:] mm a")} <Text ml="10px" className={style.due_date_from_now_text} as="span" color={primaryCustomColor}>{dayjs(datePickerValue).fromNow()} </Text> </> : 'Set due date & time'}</Text>
                                </Flex>

                                <DateTimePicker
                                    clearIcon={MdClear({
                                        style: {
                                            color: 'white'
                                        }
                                    })}
                                    minDate={new Date()}
                                    calendarClassName="due_date_calender"
                                    className={onOpenDatePicker ? `${style.show_date_picker}` : `${style.hide_date_picker}`}
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
        </>
    )
}
