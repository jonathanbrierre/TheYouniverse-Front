const initialState = {
    userObj: {},
    selectedUser: {},
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

        case 'SELECTED':
            return {...state, selectedUser: action.payload}

        case 'UNSELECTED':
            return {...state, selectedUser: {}}
        
        case 'UNFOLLOW':
            let userFollowees = [...state.userObj.followees]
            let filteredFollowees = userFollowees.filter(followee => followee.id !== action.payload.selectedUserObj.id)
            let selectedFollowers = [...state.selectedUser.followers]
            let filteredFollowers = selectedFollowers.filter(follower => follower.id !== action.payload.currentUserObj.id)
            return {...state, userObj:{ ...state.userObj, followees: filteredFollowees}, selectedUser:{...state.selectedUser, followers: filteredFollowers}}
            
        case 'FOLLOW':
            // console.log('hello')
            return {...state, userObj: {...state.userObj, followees:[...state.userObj.followees, action.payload.newUserObj]}, selectedUser:{...state.selectedUser, followers: [...state.selectedUser.followers, action.payload.currentUserObj]}}
        default:
            return state
    }
}