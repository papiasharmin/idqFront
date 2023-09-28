import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './components/App';
import { ContextProvider } from './Contexts';
import { CONTRACT_ADDRESS } from './components/common/Constant';



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>

    <ContextProvider>
      <App />
    </ContextProvider>
  
  </React.StrictMode>
);


