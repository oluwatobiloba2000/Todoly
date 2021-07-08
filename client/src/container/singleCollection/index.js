import React, { useEffect, useMemo, useState } from 'react';
import {
    Box, Text, Flex, IconButton, Menu,
    MenuList,
    MenuItem,
    MenuButton,
    Skeleton,
    Icon,
    Button,
    useToast,
    Spinner
} from '@chakra-ui/react';
import Nav from '../../component/navigation';
import style from './singleCollection.module.css';
import { HiDotsHorizontal } from "react-icons/hi";
import AddTaskInput from '../../component/add_task_input';
import { BiChevronLeft
    // , BiEditAlt
 } from 'react-icons/bi';
import PendingTasks from '../../component/pending_task';
import { useHistory, useParams } from 'react-router-dom';
import CompletedTask from '../../component/completed_task';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { add_collection, delete_collection } from '../../app/slice/collectionSlice/collection';
import { Collections as CollectionQuery } from '../../graphQl/query';
import { clearTokenInLocalStorage, getTokenFromLocalStorage, isTokenExpired } from '../../utils/auth';
import { BsArrowCounterclockwise, BsArrowLeftShort } from 'react-icons/bs';
import { FiCloudOff } from 'react-icons/fi';
import { request } from 'graphql-request';
import { deleteCollectionQuery } from '../../graphQl/mutation';
import { url } from '../..';

export default function SingleCollection() {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const toast = useToast();
    const collections = useSelector(state => state.collection);
    const [{ error, loading }, setRequestState] = useState({
        error: null,
        loading: false
    })
    const [loadingDeleteCollection, setLoadingDeleteCollection] = useState(false);
    const token = getTokenFromLocalStorage();

    useEffect(()=>{
        if (token && !collections.data && !isTokenExpired()) {
            fetchCollection()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
                error: e && e.message
              })
            }
          })
      }
    
    const singleCollection = useMemo(() => {
        if (collections && collections.data) {
            let index = collections.data.findIndex((col) => col.id === id);
            if (index >= 0) {
                return collections.data[index];
            } else {
                return null;
            }
        }
    }, [collections, id])

    const deleteCollection = () => {
        setLoadingDeleteCollection(true);

        request(url, deleteCollectionQuery, {
            token,
            collectionId: singleCollection.id
          })
            .then((dataFromRequest) => {
              setLoadingDeleteCollection(false);
              toast({
                position: "top",
                title: `Collection deleted`,
                status: "success",
                isClosable: true,
              })
              dispatch(delete_collection(dataFromRequest.deleteCollection))
              history.push('/collections')
            })
            .catch((e) => {
                setLoadingDeleteCollection(false);
        
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
                    title: `Looks Like you are not connected to the internet`,
                    status: "warning",
                    isClosable: true,
                  })
              } else {
                toast({
                    position: "top",
                    title: `Cannot delete collection`,
                    status: "warning",
                    isClosable: true,
                  })
              }
            })
    }

    const skeletonLoader = () => {
        return <><Skeleton height="45px" marginBottom="15px" marginTop="15px" startColor="#303140" endColor="#383b48" />
            <Skeleton height="45px" marginBottom="15px" marginTop="15px" startColor="#303140" endColor="#383b48" />
        </>
    }

    const errorDiv = () => {
        return <Flex justifyContent="center" alignItems="center" minHeight="330px"
            flexDirection="column" h="100%">
            {error === 'Network Error' ?
              <>
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
                    {error && <Text color="white" fontFamily="dusha">Something went wrong</Text>}
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


    return (
        <Box justifyContent="center" overflowX="hidden" alignItems="center" backgroundColor="rgb(24, 24, 32)" minHeight="100vh" width="100%" paddingBottom="30px">

            <Nav />



            <Flex flexDirection="column" width="728px" m="50px auto 0px" className={style.tasks_list_container}>

                <Flex alignItems="center">

                    <IconButton backgroundColor="#20212c" aria-label="Go back" _hover={{ backgroundColor: "#323442" }}
                        onClick={() => history.push('/collections')}

                        _active={{ border: `2px solid ${singleCollection && singleCollection.color}`, backgroundColor: "#323442" }}
                        _focus={{ border: `2px solid ${singleCollection && singleCollection.color}` }}

                        icon={BiChevronLeft({ style: { color: 'white', fontSize: '30px' } })}
                    />

                    {/* collection title */}

                    <Flex w="100%" justifyContent="space-between" ml="20px">
                        <Skeleton isLoaded={!loading} startColor="#303140" endColor="#383b48">
                            <Text className={style.collection_title} color="white" fontWeight="bold" fontSize="30px">{singleCollection && singleCollection.name}</Text>
                        </Skeleton>

                        <Skeleton isLoaded={!loading} startColor="#303140" endColor="#383b48">
                            {
                            loadingDeleteCollection 
                            ? <Spinner color={singleCollection.color || 'white'} />
                            :
                            singleCollection
                                &&
                                <Menu matchWidth={true}  isLazy placement="bottom-end">
                                    <MenuButton>
                                        <IconButton
                                            backgroundColor="inherit"
                                            borderRadius="30px"
                                            aria-label="options"
                                            _hover={{
                                                backgroundColor: "inherit"
                                            }}

                                            _active={{
                                                backgroundColor: "inherit"
                                            }}

                                            icon={HiDotsHorizontal({
                                                style: {
                                                    color: 'white',
                                                    fontSize: '26px'
                                                }
                                            })}
                                        />
                                    </MenuButton>
                                    <MenuList zIndex="100" border="1px solid #505069" background="#20212c" color="white">
                                        {/* MenuItems are not rendered unless Menu is open */}
                                        {/* <MenuItem _hover={{
                                            backgroundColor: '#3d3d52'
                                        }}
                                            _focus={{
                                                backgroundColor: '#3d3d52'
                                            }}
                                            fontSize="15px" icon={BiEditAlt({
                                                fontSize: '15px'
                                            })}>Edit Collection</MenuItem> */}

                                        <MenuItem fontSize="15px" onClick={()=> deleteCollection()} icon={AiOutlineDelete({
                                            fontSize: "15px"
                                        })}
                                            color="#ff7150" _hover={{
                                                backgroundColor: "#cf3917",
                                                color: "white"
                                            }}
                                            _focus={{
                                                backgroundColor: "#cf3917",
                                                color: "white"
                                            }}
                                        >Delete Collection</MenuItem>
                                    </MenuList>
                                </Menu>
                            }
                        </Skeleton>
                    </Flex>

                </Flex>

                {
                    error ? errorDiv() :
                         (singleCollection || loading)
                            ? <Flex flexDirection="column" pt="40px">
                                <>
                                    {!loading && <PendingTasks singleCollection={singleCollection} primaryCustomColor={singleCollection && singleCollection.color} />}
                                    {loading && skeletonLoader()}
                                    <Skeleton isLoaded={!loading} startColor="#303140" endColor="#383b48">
                                        <AddTaskInput collectionId={id} primaryCustomColor={singleCollection && singleCollection.color} />
                                    </Skeleton>

                                    {loading && skeletonLoader()}
                                    {!loading && <CompletedTask singleCollection={singleCollection} primaryCustomColor={singleCollection && singleCollection.color} />}
                                </>

                            </Flex>
                            :
                            <Flex w="100%" marginTop="40px"
                                flexDirection="column"
                                alignItems="center">
                                <Text color="white" fontFamily="dusha" fontSize="20px">Opps! This collection cannot be found</Text>
                                <Button mt="10px" color="white" borderRadius="20px" fontFamily="dusha" bgGradient="linear(to-l, #7928CA, #FF0080)"
                                    _hover={{ bgGradient: "linear(to-l, #3f1669, #dc0f76)" }}
                                    _active={{ bgGradient: "linear(to-l, #3f1669, #dc0f76)" }}
                                    onClick={() => history.push("/collections")}
                                    leftIcon={BsArrowLeftShort({ style: { color: 'white', fontSize: "20px" } })}>
                                    Explore your collections
                                </Button>
                            </Flex>
                }
            </Flex>
        </Box>
    )
}
