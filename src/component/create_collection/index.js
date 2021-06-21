import React, { createRef } from 'react'
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
    useRadioGroup
} from "@chakra-ui/react"
import { BsCollectionFill } from 'react-icons/bs'

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
    const options = ["#70c4bf", "#fc76a1", "#dbbe56", "#e39264", "#d25a61", "#ae68e6", "#9e7f72"];

    const { getRootProps, getRadioProps } = useRadioGroup({
      name: "colors",
      defaultValue: "#70c4bf",
      onChange: console.log,
    })
  
    const group = getRootProps()

    

    return (
        <Modal
            isCentered
            onClose={onCloseCollectionModal}
            isOpen={isOpenCollectionModal}
            initialFocusRef={initialRef}
            motionPreset="scale"
         
        >
            <ModalOverlay />
            <ModalContent width="90%" background="#21212d" color="white"  borderRadius="13px">
                <ModalHeader>Create Collection</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input ref={initialRef} placeholder="My collection" />
                        </FormControl>

                        <FormControl mt="15px">
                            <FormLabel>Choose a color</FormLabel>
                            <HStack flexWrap="wrap" {...group}>
                                {options.map((value) => {
                                    const radio = getRadioProps({ value })
                                    return (
                                    <RadioCard  key={value} backgroundColor={value} {...radio}>
                                        <Icon as={BsCollectionFill} color="white" fontSize="20px"/>
                                    </RadioCard>
                                    )
                                })}
                            </HStack>
                        </FormControl>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button backgroundColor="#3d3c50" _hover={{
                        backgroundColor: '#525166'
                    }} colorScheme="blue" mr={3} >
                        Create
                    </Button>
                    <Button variant="ghost" onClick={onCloseCollectionModal} _hover={{
                        backgroundColor: '#525166'
                    }}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}



export default CreateCollection
