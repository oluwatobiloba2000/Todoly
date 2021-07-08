import jwtDecode from 'jwt-decode';
const jwt_token_name = 'todoly_session';
/**
 * 
 * @param {
 * } token 
 * @returns {}
 * save a token in the local storage
 */ 
export const saveTokenInLocalStorage = (token) => {
    if(token){
        return localStorage.setItem(jwt_token_name, JSON.stringify(token))
    }
    return
}

/**
 * @param {
 * } null 
 * @returns void
 * a function that clears token from the local storage
 */
export const clearTokenInLocalStorage = () => {
    localStorage.removeItem(jwt_token_name);
}

/**
 * @param {
 * } null 
 * @returns {}
 * a function that returns the token from the localstorage
 */

export const getTokenFromLocalStorage = () =>{
    const token = localStorage.getItem(jwt_token_name);
    if(token){
    return JSON.parse(token);
    }else{
        return null;
    }
}

export const decodeToken = () =>{
    const token = getTokenFromLocalStorage()
    if(token){
        return jwtDecode(token);
    }
}

/**
 * @param {
 * } token 
 * @returns true | false
 *  
 * a function that returns true if a token is expired and false if it is not expired
 * */

export const isTokenExpired = () => {
    const token = getTokenFromLocalStorage();
    if(token){
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 <= new Date()){
             clearTokenInLocalStorage()
             return true;
        };
        return false;
    }else{
        return true;
    }
}