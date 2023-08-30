import {
    UPDATE_AUTH_USER
} from '../../shared/constants/ActionTypes';

export const setLoggedInUser = (payload = null)  => ({
    type: UPDATE_AUTH_USER,
    payload: payload
})
