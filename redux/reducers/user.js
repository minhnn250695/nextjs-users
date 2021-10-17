import ActionTypes from '../actions/actionTypes';

const userReducer = (state = [], action) => {
    switch (action.type) {

        case ActionTypes.FETCH_USERS_SUCCESS:
            return action.payload;

        case ActionTypes.ADD_USER_SUCCESS:
            return [...state, action.payload];

        case ActionTypes.UPDATE_USER_SUCCESS:
            return state.map(user => user.id === action.payload.id ? action.payload : user);

        case ActionTypes.DELETE_USER_SUCCESS:
            return state.filter(s => s.id !== action.payload);

        case ActionTypes.USER_UPDATE_STORE:
            return action.payload

        case ActionTypes.RESET_USER_STORE:
            return [];

        default:
            return state;
    }
}

export default userReducer;