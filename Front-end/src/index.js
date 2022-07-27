import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//routers
import Home from './routers/Home';
import Login from './routers/Login';
import SignUp from './routers/SignUp';
import FindAccount from './routers/FindAccount';
import Search from './routers/Search';
import MyPage from './routers/MyPage';
import NotFound from './routers/PageNotFound';
import EditAccount from './routers/EditAccount';
import NoticePage from './routers/NoticePage';
import CreateRoom from './routers/CreateRoom';
import LivePage from './routers/LivePage';

//
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store.js' // store.js import 하기
import { BrowserRouter,Route,Routes } from 'react-router-dom' // react-router-dom 사용
import 'bootstrap/dist/css/bootstrap.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='background'>

    <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/find" element={<FindAccount />} />
              <Route path="/search" element={<Search />} />
              <Route path="/*" element={<NotFound />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/editaccount" element={<EditAccount />} />
              <Route path="/notice" element={<NoticePage />} />
              <Route path='/createroom' element={<CreateRoom/>}></Route>
              <Route path='/live' element={<LivePage/>}></Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>  
    </Provider> 
  </React.StrictMode>
  </div>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
