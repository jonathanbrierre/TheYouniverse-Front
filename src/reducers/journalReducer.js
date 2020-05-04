const initialState = {
    entries: []
}
export default function journalManager(state = initialState, action){
    switch(action.type){

        case 'SHOW_ENTRIES':
            console.log(action.payload)
            return {...state, entries: action.payload}

        case 'NEW_ENTRY':
            return {...state, entries: [ action.payload, ...state.entries]}

        case 'UPDATE_ENTRY':
            let copy = [...state.entries]
            let updated = copy.map(entry => {
                if(entry.id === action.payload.id){
                    return action.payload.entry
                }
                return entry
            })
            return {...state, entries: updated}

        case 'DELETE_ENTRY':
            let newEntries = state.entries.filter(entry => entry.id !== action.payload)
            return {...state, entries: newEntries}

        default:
            return state

    }
}