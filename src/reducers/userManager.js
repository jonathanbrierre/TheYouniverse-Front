const initialState = {
    userObj: {},
    token: ''
}
export default function userManager(state = initialState, action){
    switch(action.type){
        case 'AUTHENTICATE_USER': 
            return {...state, userObj: action.payload.user, token: action.payload.jwt}
        
        case 'LOG_OUT':
            return initialState
            
        case 'EDIT':
            
            return {...state, userObj:{...state.userObj, ...action.payload}}
        default:
            return state
    }
}