import * as React from "react";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch, Link } from "react-router-dom";
import configureStore, { history } from 'store';
import * as  global from 'style/global.scss';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <ConnectedRouter history={ history }>
          <div className={ global.content }>
            <Switch>
              <Route exact path='/' render={ () => <Link to='/some-path'>Hello</Link> } />
              <Route path='/some-path' render={ () => <Link to='/'>Back</Link> } />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
