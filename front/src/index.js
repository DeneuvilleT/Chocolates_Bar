import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from './slices/cartSlices';
import authReducer from './slices/authSlices';
import datasReducer from './slices/datasSlices';

import './index.css';

const store = configureStore({
  reducer: {
    auth: authReducer,
    datas: datasReducer,
    cart: cartReducer,
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <HashRouter>
    <Provider store={store} >
      <App />
    </Provider>
  </HashRouter>

);
