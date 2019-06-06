import * as React from "react";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch, Link, LinkProps } from "react-router-dom";
import configureStore, { history } from 'store';
import CssBaseline from '@material-ui/core/CssBaseline'
import * as  global from 'style/global.scss';

import { LinkButton } from 'components';

const store = configureStore();

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link innerRef={ ref as any } { ...props } />
));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <ConnectedRouter history={ history }>
          <div className={ global.content }>
            <CssBaseline />
            <Switch>
              <Route exact path='/' render={ () => <Link to='/some-path'>Hello</Link> } />
              <Route path='/some-path'
                     render={ () => <LinkButton color='primary' to='/'>Back</LinkButton> } />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
