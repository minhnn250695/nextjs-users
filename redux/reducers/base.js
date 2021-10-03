import ActionTypes from '../actions/actionTypes';

const userReducer = (state = {}, action) => {
    switch (action.type) {

        case ActionTypes.START_LOGIN:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: true,
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false
            }

        case ActionTypes.LOGIN_FAIL:
        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false
            }

        case ActionTypes.START_LOADING:
            return { ...state, isLoading: true }

        case ActionTypes.END_LOADING:
            return { ...state, isLoading: false }

        default:
            return state;
    }
}

export default userReducer;