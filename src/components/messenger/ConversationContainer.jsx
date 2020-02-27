import React, { Component } from 'react'
import MainNav from '../navigation/MainNav'
import UserListContainer from './Lists/UserListContainer'

class ConversationContainer extends Component {
    render() {
        return (
            <div>
                <MainNav/>
                <UserListContainer/>
            </div>
        )
    }
}

export default ConversationContainer
