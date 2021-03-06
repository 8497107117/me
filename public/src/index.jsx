//  react
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
//  components
import App from './components/App';
//  redux
import creatStore from './store';
import { verifyAuth } from './actions/authActions';

const history = createBrowserHistory();
const store = creatStore(history);

const renderDom = () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
};

const run = async () => {
  try {
    await store.dispatch(verifyAuth());
    renderDom();
  }
  catch (err) {
    throw err;
  }
};

run();
