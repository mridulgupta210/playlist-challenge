import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import fetchMiddleware from '../middlewares/fetchMiddleware';
import { reducersService } from '../services/reducersService';

const configureStore = () => {
    let middlewares = [thunk, fetchMiddleware, createLogger({})];

    return createStore(
        combineReducers(reducersService.getAllReducers()),
        applyMiddleware(...middlewares))
};

export default configureStore;
