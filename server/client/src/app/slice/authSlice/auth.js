import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
  name: 'user',
  initialState: {
     data: null,
  },
  reducers: {
    add_user: (state, action) => {
      state.data = action.payload;
    },
    clear_user: (state, action)=>{
      state.data = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { add_user , clear_user} = userSlice.actions

export default userSlice.reducer;

// export const getAdminAsync = (history) => async (dispatch) =>{
//   dispatch(set_loading(true))
//   dispatch(set_error(''))
//       const getAdminApi = await getAdmin();
//       if(getAdminApi.success){
//           dispatch(set_loading(false))
//           dispatch(add_admin(getAdminApi.data))
//       }else{
//           if(getAdminApi.error && getAdminApi.error === 'Request failed with status code 401'){
//             return  handleRedirectBeforeLogout(history)
//           }
//           dispatch(set_loading(false))
//           dispatch(set_error(getAdminApi.error))
//       }
// }
