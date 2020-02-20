export default function navManager(state = false, action){
    switch(action.type){
        case 'ACTIVATE_NAV':
            return true
        case 'DEACTIVATE_NAV':
            return false
        default:
            return state
    }
}