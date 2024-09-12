import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import { toast } from 'react-toastify';
import { dispatch } from "../../redux";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await userService.getAllCodeService('gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed)
            }
        } catch (e) {
            console.log(e)
            dispatch(fetchGenderFailed)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed)
            }

        } catch (e) {
            console.log(e);
            dispatch(fetchPositionFailed);
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed);
            }
        } catch (e) {
            console.log(e);
            dispatch(fetchRoleFailed);
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const createNewUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.createNewUserService(data);
            console.log('check responseL', res);
            if (res && res.errCode === 0) {
                toast.success('Create a new user succeed!');
                dispatch(createNewUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(createNewUserFailed());
            }
        } catch (e) {
            console(e);
            toast.error('Create user failed!');
            dispatch(createNewUserFailed());
        }
    }
}
export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_NEW_USER_SUCCESS,
})

export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_NEW_USER_FAILED,
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUsers('ALL');
            console.log('check responseL', res);
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            console(e);
            dispatch(createNewUserFailed());
        }
    }
}

export const fetchAllUserSuccess = (userData) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: userData
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.CREATE_NEW_USER_FAILED
})

export const deleteUser = (id) => {
    return (async (dispatch, getState) => {
        try {
            let res = await userService.deleteUserService(id);
            if (res && res.errCode === 0) {
                toast.warn('User deleted!');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }

        } catch (e) {
            console.log(e);
            toast.error('Delete failed!');
            dispatch(deleteUserFailed());
        }
    })
}

export const deleteUserSuccess = (userData) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    users: userData
})

export const deleteUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const editUserStart = (user) => {
    return (async (dispatch, getState) => {
        try {
            let res = await userService.editUserService(user);
            if (res && res.errCode === 0) {
                toast.info('Update user completed!');
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }

        } catch (e) {
            console.log(e);
            toast.error('Edit failed!');
            dispatch(editUserFailed());
        }
    })
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_NEW_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_NEW_USER_FAILED,
})