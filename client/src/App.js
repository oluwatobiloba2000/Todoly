import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ChakraProvider, Flex, Text, Icon, Button } from '@chakra-ui/react';
import Home from './container/Home';
import Dashboard from './container/Dashboard';
import SingleCollection from './container/singleCollection';
import { request } from 'graphql-request';
import { theme } from './theme';
import { TraceSpinner } from "react-spinners-kit";
import { User } from './graphQl/mutation';
import { useDispatch } from 'react-redux';
import { add_user } from './app/slice/authSlice/auth';
import ProtectedRoute from './HOC/ProtectedRoute';
import { FiCloudOff } from 'react-icons/fi';
import { clearTokenInLocalStorage, getTokenFromLocalStorage, isTokenExpired } from './utils/auth';
import { BsArrowCounterclockwise, BsExclamationOctagonFill } from 'react-icons/bs';
import { RiLoginCircleFill } from 'react-icons/ri';
import { HiShieldExclamation } from 'react-icons/hi';
import { url } from '.';

function App() {
  const dispatch = useDispatch();
  const [{ error, loading }, setRequestState] = useState({
    error: null,
    loading: null
  })


  const token = getTokenFromLocalStorage();
  const IsTokenExpired = isTokenExpired();

  useEffect(() => {
    if (token && !IsTokenExpired && window.location.pathname !== '/') {
      fetchUser()
    }
    // eslint-disable-next-line
  }, [])

  const fetchUser = () => {
    setRequestState({
      error: null,
      loading: true
    })
    request(url, User, {
      token
    })
      .then((dataFromRequest) => {
        setRequestState({
          loading: false
        })
        dispatch(add_user(dataFromRequest.user));
      })
      .catch((e) => {

        if (e && e.message.indexOf('Invalid access') >= 0) {
          setRequestState({
            loading: false,
            error: 'Invalid access'
          })
          clearTokenInLocalStorage()
        } else if (e && e.message.indexOf("Network request") >= 0) {
          setRequestState({
            loading: false,
            error: 'Network Error'
          })
        } else {
          setRequestState({
            loading: false,
            error: 'something went wrong'
          })
        }
      })
  }



  if (loading || error) {
    return <Flex flexDirection="column" w="100%" justifyContent="center" alignItems="center" h="100vh" m="0" backgroundColor="#181820">
      <TraceSpinner size={80} color="#686769" loading={loading} />
      {error === 'Network Error' 
         ? <Icon as={FiCloudOff} color="#686769" fontSize="80px" />
         : error === 'Invalid access'
         ? <Icon as={HiShieldExclamation} color="#ff613d" fontSize="80px" />
         : error === 'something went wrong' && <Icon as={BsExclamationOctagonFill} color="#ff613d" fontSize="80px" />
         }
      {loading && <Text color="white" fontFamily="dusha" fontSize="20px" mt="30px">Please Wait ...</Text>}
      {/* {error && } */}
      {error === 'Network Error' ?
        <Flex flexDirection="column">
          <Text color="white" fontFamily="dusha">Looks like you are not connected to the internet</Text>
          <Button
            style={{
              marginTop: '10px',
              fontFamily: 'dusha',
              backgroundImage: "linear-gradient(to left, #7928CA, #FF0080)",
              color: 'white',
              borderRadius: '20px',
              width: '106px',
              height: '40px',
              border: 'none',
              margin: 'auto',
              cursor: 'pointer'
            }}

            className="retry_btn"
            onClick={() => !IsTokenExpired ? fetchUser() : window.location.reload()
            }

            leftIcon={BsArrowCounterclockwise({
              style: {
                color: 'white',
                fontSize: "20px"
              }
            })}
          >
            Retry</Button>
        </Flex>

        : <>
          <Text color="white" fontFamily="dusha" style={{ marginTop: "40px" }}>{error}</Text>
          
          {error === 'Invalid access' &&
            <>
              <Button
                style={{
                  marginTop: '10px',
                  fontFamily: 'dusha',
                  backgroundImage: "linear-gradient(to left, #7928CA, #FF0080)",
                  color: 'white',
                  borderRadius: '20px',
                  width: '106px',
                  height: '40px',
                  border: 'none',
                  cursor: 'pointer'
                }}

                className="retry_btn"
                onClick={() => window.location.href = '/'
                }

                leftIcon={RiLoginCircleFill({
                  style: {
                    color: 'white',
                    fontSize: "20px"
                  }
                })}
              >
                Login</Button>
            </>
          }
        </>
      }
    </Flex>
  }

  // if (data) {

  // }


  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <ProtectedRoute path="/collections">
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute path="/collection/:id">
            <SingleCollection />
          </ProtectedRoute>

        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
