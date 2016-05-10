'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import App from './views/App';
import Store from './data/Store';

const render = () => {
  ReactDOM.render(<App items={Store.getState()}/>, document.getElementById('app'));
}

Store.subscribe(render);
render();