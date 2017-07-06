import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import App from './app.jsx'
import configureStore from './store/configureStore'

const store = configureStore();
render( <AppContainer><Provider store={store}><App/></Provider></AppContainer>, document.querySelector("#app"));


if (module && module.hot) {
    module.hot.accept('./app.jsx', () => {
        const App = require('./app.jsx').default;
        render(
            <AppContainer>
                <Provider store={store}>
                    <App/>
                </Provider>
            </AppContainer>,
            document.querySelector("#app")
        );
    });
}
