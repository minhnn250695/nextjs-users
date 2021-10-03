import ActionTypes from '../../actions/actionTypes';

export const getTasks = () => async dispatch => {
    try {
        dispatch({ type: ActionTypes.START_LOADING });

        const response = await fetch('/api/task');
        const task = await response.json();
        dispatch({
            type: ActionTypes.FETCH_TASKS_SUCCESS,
            payload: task
        });

    } catch (error) {
    }
}


export const addTask = (data) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await createTaskAPI(data);
        dispatch({ type: ActionTypes.ADD_TASK_SUCCESS, payload: res.data });

    } catch (error) {
    }
}

export const updateTask = (data) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await updateTaskAPI(data);
        dispatch({ type: ActionTypes.UPDATE_TASK_SUCCESS, payload: res.data });

    } catch (error) {
    }
}

export const deleteTask = (id) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        let res = await deleteTaskAPI(id);
        dispatch({ type: ActionTypes.DELETE_TASK_SUCCESS, payload: id });

    } catch (error) {
    }
}