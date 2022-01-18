import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './assets/css/index.css';
import './assets/fonts/themify-icons/themify-icons.css';
import "./assets/scss/lotto-dashboard-react.scss";

import App from './App';
import {store} from './redux/_helpers';
import {BrowserRouter, HashRouter} from 'react-router-dom'

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
