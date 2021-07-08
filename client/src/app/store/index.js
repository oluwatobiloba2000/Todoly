import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import userSlice from '../slice/authSlice/auth';
import collectionSlice from '../slice/collectionSlice/collection';

let rootReducers  = combineReducers({
    user: userSlice,
    collection: collectionSlice,
})

export default configureStore({
    reducer: rootReducers,
})
