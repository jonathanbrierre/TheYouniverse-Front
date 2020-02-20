import userManager from './userManager'
import navManager from './navBarReducer'
import topicsManager from './topicsReducer'
import {combineReducers} from 'redux'

const combined = combineReducers({
    userManager,
    navManager,
    topicsManager
})

export default combined