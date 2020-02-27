

export const authenticateUser = (userObj) => {
    return{
        type: 'AUTHENTICATE_USER',
        payload: userObj
    }
}

export const logOutUser = () => {
    return {type: "LOG_OUT"}
}

// Edit a User

export const editUserInfo = (userObj) => {
    return {type: 'EDIT', payload: userObj }
}

export const selectUser = userObj => {
    return{type: 'SELECTED', payload: userObj}
}

export const unselectUser = () => {
    return{type: 'UNSELECTED'}
}

export const handleUnfollow = (selectedUserObj, currentUserObj) => {
    return{type: 'UNFOLLOW', payload: {selectedUserObj, currentUserObj}}
}

export const handleFollow = (newUserObj, currentUserObj) => {
    return{type: 'FOLLOW', payload: {newUserObj, currentUserObj}}
}