import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './app/index';
import {createStore,compose,applyMiddleware} from 'redux'
import rootReducer from './app/reducers'
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
const loggerMiddleware = createLogger({ predicate:(getState,action) => __DEV__ });

function configureStore(){
	const enhancer = compose (
		applyMiddleware(
			thunk,
			loggerMiddleware,
		),
	);

	let store = createStore(rootReducer,{},enhancer);
	return store
}

const store = configureStore();

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('PocketBarter', () => AppWrapper);
