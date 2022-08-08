import { configureStore, createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';


let token = createSlice({
  name: 'token',
  initialState: {
    token: ''
  },
  reducers: {
    getToken(state, action) {
      state.token = action.payload
      console.log(state.token)
    },
  }
})

let user = createSlice({
  name:'user',
  initialState:{
    info : ''
  },
  reducers: {
    getInfo(state, action) {
      state.info = action.payload
      console.log(state.info)
    },
  }

})

const reducers = combineReducers({
  token: token.reducer,
  info: user.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);



export let { getToken } = token.actions
export let { getInfo } = user.actions

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})