import 'isomorphic-fetch';
import { showProgress, hideProgress } from '../components/loader/actions';

const handleResponse = (config, json, handler, dispatch) => {
    if (handler) {
        dispatch(handler(json));
    }

    if (config.showProgress) {
        dispatch(hideProgress());
    }
};

const fetchMiddleware = store => next => action => {
    if (!action || !action.fetchConfig) {
        return next(action);
    }

    const dispatch = store.dispatch;
    const config = action.fetchConfig;

    if (!config.hasOwnProperty('showProgress')) {
        config.showProgress = true;
    }

    const clonedAction = JSON.parse(JSON.stringify(action));
    delete clonedAction.fetchConfig;

    dispatch(clonedAction);

    if (config.showProgress) {
        dispatch(showProgress());
    }

    const { path, method, body } = config;

    let headers = {};
    if (method === 'POST') {
        headers = new Headers({ 'Content-Type': 'application/json' });
    }

    const successHandler = config.onSuccess;
    const exceptionHandler = config.onException;

    return fetch(path,
        {
            method,
            headers,
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(json => {
            handleResponse(config, json, successHandler, dispatch);
        })
        .catch(error => {
            handleResponse(config, error, exceptionHandler, dispatch);
        });
};

export default fetchMiddleware;
