import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {Card, Button, ListGroup, ListGroupItem, Nav} from 'react-bootstrap';
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import './index.css'
import Users from './containers/Users'
import Login from './containers/Login'
import Animals from './containers/Animals'
import NotFound from './containers/NotFound'


const routing = (
  <Router>
    <div>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Animals</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Users</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Other Settings</Nav.Link>
        </Nav.Item>
      </Nav>;
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/animals" component={Animals} />
        <Route path="/Users" component={Users} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.unregister();
