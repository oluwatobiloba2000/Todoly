import React from 'react';
import { Box, Text, Flex , useDisclosure } from '@chakra-ui/react';
import Nav from '../../component/navigation';
import style from './style.module.css';

import CreateCollection from '../../component/create_collection';
import Collections from '../../component/collections';
import { getTokenFromLocalStorage, isTokenExpired } from '../../utils/auth';
import { useHistory } from 'react-router-dom';

const Dashboard = () =>{
    const { isOpen: isOpenCollectionModal, onOpen: onOpenCollectionModal, onClose : onCloseCollectionModal } = useDisclosure();
    const history = useHistory();

    const TokenExpired = isTokenExpired();
    const token = getTokenFromLocalStorage();
    if(TokenExpired){
        history.push(`/?rdr${window.location.pathname}`);
        return<></>; 
    }
    

    return <Box justifyContent="center" overflowX="hidden" alignItems="center" backgroundColor="rgb(24, 24, 32)" minHeight="100vh" width="100%" paddingBottom="30px">
       
       <Nav />

        <CreateCollection isOpenCollectionModal={isOpenCollectionModal} onOpenCollectionModal={onOpenCollectionModal} onCloseCollectionModal={onCloseCollectionModal}/>

        <Flex flexDirection="column" width="728px"  m="50px auto 0px" className={style.collection_container}>
                <Text color="white" ml="20px" fontWeight="bold" mb="35px" fontSize="30px">Collections</Text>

              
            <Collections onOpenCollectionModal={onOpenCollectionModal} token={token}/>
        </Flex>

        {/* <IconButton aria-label="Add todo" icon={<SearchIcon />} /> */}
    </Box>
}

export default Dashboard;