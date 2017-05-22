import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import Store from "src/store";
import App from 'src/components/app';

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

