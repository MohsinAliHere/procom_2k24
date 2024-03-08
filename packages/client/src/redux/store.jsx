import { configureStore } from '@reduxjs/toolkit'
import user_auth_slice from './slice/user_auth_slice'



const store = configureStore({
  reducer: {
    user_auth: user_auth_slice,
  },
})


export {store}