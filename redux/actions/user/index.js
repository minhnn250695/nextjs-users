

import ActionTypes from '../../actions/actionTypes';

export const getUsers = () => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const response = await fetch('/api/user');
        const users = await response.json();

        dispatch({
            type: ActionTypes.FETCH_USERS_SUCCESS,
            payload: users
        });

    } catch (error) {
    }
}

export const addUser = (data) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await createUserAPI(data);
        dispatch({ type: ActionTypes.ADD_USER_SUCCESS, payload: res.data });


    } catch (error) {
    }
}

export const updateUser = (data) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await fetch('api/user', { method: 'PUT', body: { data: data } });
        dispatch({ type: ActionTypes.UPDATE_USER_SUCCESS, payload: res.data });


    } catch (error) {
    }
}

export const deleteUser = (id) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await fetch('api/user', { method: 'DELETE', body: { id: id } });
        dispatch({ type: ActionTypes.DELETE_USER_SUCCESS, payload: id });

    } catch (error) {
    }
}