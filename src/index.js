import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'; 
// import App from './App';
import Appp from './appp';
import reportWebVitals from './reportWebVitals';
// import { ChakraProvider } from "@chakra-ui/react"
ReactDOM.render(
  <React.StrictMode>
   <Appp/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
