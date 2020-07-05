import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const configureProvider = component => (
    <Provider store={configureStore()}>
        <React.StrictMode>
            {component}
        </React.StrictMode>
    </Provider>
);

export default configureProvider;
