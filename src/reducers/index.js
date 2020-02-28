import userManager from './userManager'
import navManager from './navBarReducer'
import topicsManager from './topicsReducer'
import messengerManager from './messengerReducer'
import {combineReducers} from 'redux'

const combined = combineReducers({
    userManager,
    navManager,
    topicsManager,
    messengerManager
})

export default combined