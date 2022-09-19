import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { accountReducer } from './account.slice'
import { authReducer } from '../features/auth/auth.slice'

const reducer = combineReducers({
    account: accountReducer,
    auth: authReducer,
})

export default configureStore({
  reducer
})
