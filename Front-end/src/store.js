import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import axios from 'axios';


let token = createSlice({
  name: 'token',
  initialState: {
    token: ''
  },
  reducers: {
    getToken(state, action) {
      state.token = action.payload
    },
  }
})

let user = createSlice({
  name: 'user',
  initialState: {
    info: ''
  },
  reducers: {
    getInfo(state, action) {
      state.info = action.payload
    },
  }
})

const asyncOnclickMessage = createAsyncThunk(
  'updateRemainMessage', async () => {
    const result = await axios.get(
      'https://i7c110.p.ssafy.io/api/messages/count',
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      }
    );
    return result.data
  }

)


let notice = createSlice({
  name: 'notice',
  initialState: {
    noticeCount: ''
  },
  extraReducers: (builder) => {
    builder.addCase(asyncOnclickMessage.fulfilled, (state, action) => {
      state.noticeCount = action.payload
    })
    // builder.addCase(asyncOnclickMessage.fulfilled, (state, action)=>{

    // })
    // })
  }
})

const reducers = combineReducers({
  token: token.reducer,
  info: user.reducer,
  noticeCount: notice.reducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);



export let { getToken } = token.actions
export let { getInfo } = user.actions
export { asyncOnclickMessage }

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})