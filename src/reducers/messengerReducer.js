const initialState = {
    conversations: [],
    messages: []
}
export default function messengerManager(state = initialState, action){
    switch(action.type){

        case 'USER_CONVOS':
            console.log(action.payload)
            return {...state, conversations: action.payload}

        default:
            return state
    }
}