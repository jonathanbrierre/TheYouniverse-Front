const initialState = {
    conversations: []
}
export default function messengerManager(state = initialState, action){
    switch(action.type){

        case 'USER_CONVOS':
            console.log(action.payload)
            return {...state, conversations: action.payload}

        case 'UPDATED':
            let newConvos = [...state.conversations]
            let updatedConvos = newConvos.map(convo => {
                if(convo.id === action.payload.convoId){
                    convo.updated = true
                    convo.lastMessage = action.payload.lastMessage
                }
                return convo
            })
            return {...state, conversations: updatedConvos}

        case 'CLEAR_CONVOS':
            return {...state, conversations: []}
            
        default:
            return state
    }
}