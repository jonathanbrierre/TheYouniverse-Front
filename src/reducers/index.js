import userManager from './userManager'
import {combineReducers} from 'redux'

const combined = combineReducers({
    userManager,
    something: 'true'
})

export default combined