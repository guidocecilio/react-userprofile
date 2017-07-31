import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
import routes from './routes';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

const Root = () => {
  return (
  	<MuiThemeProvider muiTheme={getMuiTheme()}>
    	<Router history={browserHistory} routes={routes} />
  	</MuiThemeProvider>
  	)
}

ReactDOM.render(<Root />, document.getElementById('app'));