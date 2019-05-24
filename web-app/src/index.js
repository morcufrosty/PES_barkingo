import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Routing from './containers/Routing'

import './index.css'


const routing = (
  <Routing></Routing>
)

ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.unregister();
