import React, { createRef, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useRadio,
    HStack,
    Icon,
    Box,
    useRadioGroup,
    useToast
} from "@chakra-ui/react"
import { BsCollectionFill } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
// import { useMutation } from '@apollo/client'
import { request } from 'graphql-request';
import { CreateCollectionQuery } from '../../graphQl/mutation'
import { clearTokenInLocalStorage, getTokenFromLocalStorage, isTokenExpired } from '../../utils/auth'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { push_new_collection } from '../../app/slice/collectionSlice/collection'
import { url } from '../..';

function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label" marginInlineStart="0 !important">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                boxShadow="md"
                borderRadius="33px"
                width="50px"
                height="50px"
                m="5px"
                _checked={{
                    backgroundColor: props.backgroundColor
                }}
                _focus={{
                    boxShadow: "outline",
                }}
                display="flex" justifyContent="center" alignItems="center"
                border={`2px solid ${props.backgroundColor}`}
            >
                {props.children}
            </Box>
        </Box>
    )
}



function CreateCollection({ isOpenCollectionModal, onOpenCollectionModal, onCloseCollectionModal }) {

    const initialRef = createRef();
    const history = useHistory();
    const dispatch = useDispatch();
    const toast = useToast()
    const options = ["#70c4bf", "#fc76a1", "#dbbe56", "#e39264", "#d25a61", "#ae68e6", "#9e7f72"];
    const [colors, setColors] = useState("#70c4bf");
    const { register, handleSubmit, reset: formReset } = useForm();
    // const [createCollectionMutation ,{ data, loading, error , reset}] = useResettableMutation(CreateCollectionQuery);
    const [{loading}, setRequestState] = useState({
        loading: null
    })

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "colors",
        defaultValue: "#70c4bf",
        onChange: (value) => setColors(value),
    })

    const group = getRootProps();
    const TokenExpired = isTokenExpired();
    const token = getTokenFromLocalStorage();
    
    const onSubmitCreateCollection = (data) => {
        if(TokenExpired){
            clearTokenInLocalStorage()
            history.push(`/rdr=${window.location.pathname}`)
        }

        setRequestState({
            loading: true
        })

        request(url, CreateCollectionQuery, 
              {
                token,
                name: data.name,
                color: colors
            }
        )
        .then((dataFromRequest) => {
            setRequestState({
                loading: false
            })
            dispatch(push_new_collection(dataFromRequest.createCollection))
            onCloseCollectionModal();
            formReset()
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
                    title: (e && e.message),
                    isClosable: true,
                    status: "error"
                })
              }
        })
    }

    return (
        <Modal
            isCentered
            onClose={onCloseCollectionModal}
            isOpen={isOpenCollectionModal}
            initialFocusRef={initialRef}
            motionPreset="scale"

        >
            <ModalOverlay />
            <ModalContent width="90%" background="#21212d" color="white" borderRadius="13px">
                <ModalHeader>Create Collection</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmitCreateCollection)}>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input ref={initialRef} {...register("name", { required: true })} placeholder="My collection" />
                        </FormControl>

                        <FormControl mt="15px">
                            <FormLabel>Choose a color</FormLabel>
                            <HStack flexWrap="wrap" {...group}>
                                {options.map((value) => {
                                    const radio = getRadioProps({ value })
                                    return (
                                        <RadioCard key={value} backgroundColor={value} {...radio}>
                                            <Icon as={BsCollectionFill} color="white" fontSize="20px" />
                                        </RadioCard>
                                    )
                                })}
                            </HStack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button isLoading={loading} loadingText="Creating..." type="submit" backgroundColor="#3d3c50" _hover={{
                            backgroundColor: '#525166'
                        }} colorScheme="blue" mr={3} >
                            Create
                        </Button>
                        <Button variant="ghost" onClick={onCloseCollectionModal} _hover={{
                            backgroundColor: '#525166'
                        }}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}



export default CreateCollection;
