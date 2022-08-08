import { configureStore, createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

let user = createSlice({
  name:'user',
  initialState:{
    userPk: null,
    createDate: '',
    email: '',
    nickName: '',
    role:'',
    userName:''
  },
  reducers:{

  }
})

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

let info = createSlice({
  name: 'info',
  initialState: {
    id: '',
  },
  reducers: {
    getID(state, action) {
      state.id = action.payload
    },
  }
})

const reducers = combineReducers({
  token: token.reducer,
  info: info.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);



export let { getToken } = token.actions
export let { getID } = info.actions

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})