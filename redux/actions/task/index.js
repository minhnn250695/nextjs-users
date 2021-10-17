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
        const res = await fetch('/api/task',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        const newTask = await res.json();
        dispatch({ type: ActionTypes.ADD_TASK_SUCCESS, payload: newTask });
        setTimeout(() => {
            dispatch({ type: ActionTypes.END_LOADING });
        }, 1000);

    } catch (error) {
    }
}
export const updateTask = (data) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await fetch('/api/task',
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        const taskUpdated = await res.json();
        dispatch({ type: ActionTypes.UPDATE_TASK_SUCCESS, payload: taskUpdated });
        setTimeout(() => {
            dispatch({ type: ActionTypes.END_LOADING });
        }, 1000);

    } catch (error) {
    }
}

export const deleteTask = (id) => async dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    try {
        const res = await fetch('/api/task',
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            }
        );
        dispatch({ type: ActionTypes.DELETE_TASK_SUCCESS, payload: id });
        setTimeout(() => {
            dispatch({ type: ActionTypes.END_LOADING });
        }, 1000);

    } catch (error) {
    }
}