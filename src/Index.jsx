import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css'
import {Provider} from 'react-redux'
import store from './store';
const Index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Index />);



