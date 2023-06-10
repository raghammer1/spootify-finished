import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import './styles/_main.scss';
import { Provider } from 'react-redux';
import { store } from './routes/Discover/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CoreLayout>
        <Routes />
      </CoreLayout>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
