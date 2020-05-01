import userManager from './userManager'
import navManager from './navBarReducer'
import topicsManager from './topicsReducer'
import messengerManager from './messengerReducer'
import journalManager from './journalReducer'

import {combineReducers} from 'redux'

const combined = combineReducers({
    userManager,
    navManager,
    topicsManager,
    messengerManager,
    journalManager
})

export default combined