import ActionTypes from '../../actions/actionTypes';

// export const getUsers = () => async dispatch => {
//     dispatch({ type: ActionTypes.START_LOADING });
//     try {
//         const response = await fetch('/api/user');
//         const users = await response.json();

//         dispatch({
//             type: ActionTypes.FETCH_USERS_SUCCESS,
//             payload: users
//         });

//     } catch (error) {
//     }
// }