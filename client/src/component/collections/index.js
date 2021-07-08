import React, { useCallback, useEffect, useState } from 'react'
import { BsArrowCounterclockwise, BsCollectionFill } from "react-icons/bs";
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { Box, Text, Flex, Icon, Button, CircularProgress, Skeleton, useToast } from '@chakra-ui/react';
import { HiCheckCircle } from "react-icons/hi";
import { Collections as CollectionQuery } from '../../graphQl/query';
import style from './style.module.css';
import { FiCloudOff } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { request } from 'graphql-request';
import { add_collection } from '../../app/slice/collectionSlice/collection';
import { clearTokenInLocalStorage, isTokenExpired } from '../../utils/auth';
import { url } from '../..';

function Collections({ onOpenCollectionModal, token }) {


    // const [fetchCollection, { loading, error, data, refetch }] = useLazyQuery(CollectionQuery);
    const dispatch = useDispatch();
    const toast = useToast();
    const [{ error, loading }, setRequestState] = useState({
       error: null,
        loading: false
      }) 
      const history = useHistory();
    const collection = useSelector(state => state.collection);

    const IsTokenExpired = isTokenExpired();

    useEffect(()=>{
        if(token && !IsTokenExpired && !collection.data){
            // fetchCollection( {
            //     variables: {
            //         token
            //     }
            // })

            fetchCollection()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchCollection = () => {
        setRequestState({
          error: null,
          loading: true
        })
        request(url, CollectionQuery, {
          token
        })
          .then((dataFromRequest) => {
            setRequestState({
              loading: false
            })
            dispatch(add_collection(dataFromRequest.collections))
          })
          .catch((e) => {
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
              setRequestState({
                loading: false,
                error: 'Network Error'
              })
            } else {
              setRequestState({
                loading: false,
                error: "something went wrong"
              })
            }
          })
      }
    
    const createCollectionButton = () => {
        return <Button onClick={() => onOpenCollectionModal()} id={style.add_collection_box}>
            <Icon as={AiOutlinePlus} color="#3d3f4c" fontSize="25px" />
        </Button>
    }
    
    const total_and_completed_task = useCallback((task) => {
        let total_task;
        let completed_task;
        let completed_percentage_value;
    
        if (task && task.length > 0) {
            total_task = task.length;
            completed_task = task.reduce(function (total, task) {
                if (task.isCompleted) {
                    total += 1
                }
                return total;
            }, 0);
            completed_percentage_value = (100 * completed_task) / total_task;
            return [total_task, completed_task, completed_percentage_value]
        } else {
            total_task = 0;
            completed_task = 0;
            completed_percentage_value = 0;
    
            return [total_task, completed_task, completed_percentage_value];
        }
    }, [])


    if (error) {
        return <Flex justifyContent="center" alignItems="center" minHeight="330px"
            flexDirection="column" h="100%">
            {error === 'Network Error' ? <>
                <Icon as={FiCloudOff} color="#686769" fontSize="80px" />

                <Text color="white" fontFamily="dusha">Looks like you are not connected to the internet</Text>

                <Button mt="10px" color="white" borderRadius="20px" fontFamily="dusha" bgGradient="linear(to-l, #7928CA, #FF0080)"
                    _hover={{ bgGradient: "linear(to-l, #3f1669, #dc0f76)" }}
                    _active={{ bgGradient: "linear(to-l, #3f1669, #dc0f76)" }}
                    onClick={() => fetchCollection()}
                    leftIcon={BsArrowCounterclockwise({ style: { color: 'white', fontSize: "20px" } })}>
                    Retry
                </Button>
            </>
                : error &&
                <>
                       <Text color="white" fontFamily="dusha" >{error}</Text>
                        <Button mt="10px" color="white" borderRadius="20px" fontFamily="dusha" bgGradient="linear(to-l, #7928CA, #FF0080)"
                            _hover={{ bgGradient: "linear(to-l, #3f1669, #dc0f76)" }}
                            _active={{ bgGradient: "linear(to-l, #3f1669, #dc0f76)" }}
                            onClick={() => fetchCollection()}
                            leftIcon={BsArrowCounterclockwise({ style: { color: 'white', fontSize: "20px" } })}>
                            Retry
                     </Button>
              </>
            }

        </Flex>
    }

    if (loading) {
        return <Flex flexWrap="wrap" spacing={10}>
            <Skeleton m="20px" borderRadius="30px" startColor="#303140" endColor="#383b48" className={style.collection_box} />
            <Skeleton m="20px" borderRadius="30px" startColor="#303140" endColor="#383b48" className={style.collection_box} />
            <Skeleton m="20px" borderRadius="30px" startColor="#303140" endColor="#383b48" className={style.collection_box} />
            <Skeleton m="20px" borderRadius="30px" startColor="#303140" endColor="#383b48" className={style.collection_box} />
            <Skeleton m="20px" borderRadius="30px" startColor="#303140" endColor="#383b48" className={style.collection_box} />
            <Skeleton m="20px" borderRadius="30px" startColor="#303140" endColor="#383b48" className={style.collection_box} />
        </Flex>
    }

    // if (data && !collection.data) {
    //     dispatch(add_collection(data.collections))
    // }

    if((collection && collection.data && collection.data.length === 0)){
        return <Flex p="20px" flexDirection="column" mt="35px" fontSize="30px" alignItems="center">
                    <Text textAlign="center" bgGradient="linear(to-l, #00ff89 , #ffffff)" bgClip="text" fontFamily="dusha">No collection, you can create a collection.</Text>
                    {createCollectionButton()}
                </Flex>
    }

    return (
        <Flex flexWrap="wrap" spacing={10}>

            {
                collection && collection.data && collection.data.map((collection, index) => {
                    const [total_task, completed_task, completed_percentage_value] = total_and_completed_task(collection.task);
                    return <Link to={`/collection/${collection.id}`} key={index} className={style.collection_box_link}>
                        <Box  transition="all 250ms" className={style.collection_box}>
                            <Box backgroundColor={collection.color} className={style.collection_box_icon_container}>
                                <Icon as={BsCollectionFill} color="white" fontSize="25px" />
                            </Box>

                            <Text noOfLines={2} className={style.collection_name}>{collection.name}</Text>

                            <Flex justifyContent="space-between" alignItems="center" mt="8px">
                               {total_task === 0 ? <Text className={style.collection_done_status}>No Task</Text> :
                                <Text className={style.collection_done_status}>{completed_task}/{total_task} done</Text>
                                }

                                {
                                    completed_percentage_value === 100
                                        ? <Icon as={HiCheckCircle} color={collection.color} fontSize="22px" />
                                        :
                                        <CircularProgress value={completed_percentage_value} size="20px" color={collection.color} thickness="14px" />
                                }
                            </Flex>
                        </Box>
                    </Link>
                })
            }
            {createCollectionButton()}
        </Flex>
    )
}

export default Collections;
