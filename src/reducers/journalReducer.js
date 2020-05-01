const initialState = {
    entries: []
}
export default function journalManager(state = initialState, action){
    switch(action.type){

        case 'SHOW_ENTRIES':
            console.log(action.payload)
            return {...state, entries: action.payload}

        case 'NEW_ENTRY':
            return {...state, entries: [...state.entries, action.payload]}
        default:
            return state
    }
}