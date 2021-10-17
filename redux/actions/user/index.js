

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
        setTimeout(() => {           
            dispatch({ type: ActionTypes.END_LOADING });
        }, 1000);        

    } catch (error) {
    }
}

export const addUser = (data) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await fetch('/api/user',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        const newUser = await res.json();
        dispatch({ type: ActionTypes.ADD_USER_SUCCESS, payload: newUser });
        setTimeout(() => {           
            dispatch({ type: ActionTypes.END_LOADING });
        }, 1000); 

    } catch (error) {
    }
}

export const updateUser = (data) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await fetch('/api/user',
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        const userUpdated = await res.json();
        dispatch({ type: ActionTypes.UPDATE_USER_SUCCESS, payload: userUpdated });
        setTimeout(() => {           
            dispatch({ type: ActionTypes.END_LOADING });
        }, 1000); 

    } catch (error) {
    }
}

export const deleteUser = (id) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await fetch('/api/user',
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            }
        );
        dispatch({ type: ActionTypes.DELETE_USER_SUCCESS, payload: id });
        setTimeout(() => {           
            dispatch({ type: ActionTypes.END_LOADING });
        }, 1000); 

    } catch (error) {
    }
}