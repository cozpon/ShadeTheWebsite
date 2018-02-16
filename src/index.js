import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import reducers from './reducers';
import thunk from 'redux-thunk';
import './index.css';

import App from './containers/App';
import User from './containers/User';
import Forgot from './containers/Forgot';
import Reset from './containers/Reset';
import LogIN from './containers/LogIN';
import Register from './containers/Register';
import LogOUT from './containers/LogOUT';
import EditPassword from './containers/EditPassword';
import EditEmail from './containers/EditEmail';

import MainHeader from './components/header.components';

//---------SERVICEWORKERS-------------------
import registerServiceWorker from './lib/registerServiceWorker';

// ------STORE--------------------------
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <Router>
        <div id="source">
          <header id="global-nav-header">
          <MainHeader />
            <Link to="/">
              <div id="logo"></div>
            </Link>
          </header>
          <Route exact path="/" component={App} />
          <Route path="/login" component={LogIN} />
          <Route path="/logout" component={LogOUT} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/register" component={Register} />
          <Route path="/users/:id" component={User} />
          <Route path="/editpass/:id" component={EditPassword} />
          <Route path="/editemail/:id" component={EditEmail} />
          <Route path="/reset/:token" component={Reset}/>
        </div>
      </Router>
    </IntlProvider>
  </Provider>,
document.getElementById('root')
);

registerServiceWorker();
