import { combineReducers } from 'redux';
import user from './user';
import task from './task';
import base from './base';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useMemo } from 'react';
import thunkMiddleware from 'redux-thunk'


const appReducer = combineReducers({
  user,
  task,
  base
})

let store;

function initStore(initialState) {
	return createStore(appReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}

export const initializeStore = (preloadState) => {
	let _store = store ?? initStore(preloadState);

	if (preloadState && store) {
		_store = initStore({
			...store.getState(),
			...preloadState
		})
		_store = undefined;
	}

	if (typeof window === 'undefined') return _store;
	if (!store) store = _store;
	return _store;
}

export function useStore(initialState) {
	const store = useMemo(() => initializeStore(initialState), [initialState]);
	return store;
}