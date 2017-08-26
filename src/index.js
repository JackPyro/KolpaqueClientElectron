import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import AppContainer from './containers/AppContainer/AppContainer'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'normalize.css/normalize.css'
import store from './store';

const appElement = document.createElement('div');
appElement.setAttribute('id', 'app');
document.body.appendChild(appElement);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
);

if (module.hot) {

}
