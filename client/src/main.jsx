import React from 'react';
import App from "./App"
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import {configureStore} from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import authReducer from './State/index.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

import {

  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER


} from "redux-persist";
import  storage  from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig    = {key:'root', storage, version:1}

const persistedReducer = persistReducer(persistConfig,authReducer)
 
export const store = configureStore(
  {
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:{
        ignoreActions:[FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER
        ],
     
      },
    }),
  });


  ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

    <Provider store={store}>
      <PersistGate  persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
    </BrowserRouter>
    
   
    
  </React.StrictMode>
  
)

