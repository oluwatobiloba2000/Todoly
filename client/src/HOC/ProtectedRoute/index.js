import React, { useState } from 'react'
import { Redirect, Route } from 'react-router';
import { clearTokenInLocalStorage, isTokenExpired } from '../../utils/auth';

function ProtectedRoute({children, ...rest}) {
    const [tokenIsExpired] = useState(isTokenExpired());

    return (
        <>{
            <Route 
             {...rest}
             render={({ location })=>
             (tokenIsExpired) ? 
              <>
                  {clearTokenInLocalStorage()}
                  <Redirect to={{
                      pathname: '/',
                      search: `${location !== '/' && `rdr=${location.pathname}`}`,
                      state: {from: location}
                  }}/>
              </>
             
            : (children)
            }
            />
        }</>
    )
}

export default ProtectedRoute;
