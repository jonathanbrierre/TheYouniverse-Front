

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