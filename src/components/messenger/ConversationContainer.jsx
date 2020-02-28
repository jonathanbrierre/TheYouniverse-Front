import React, { Component } from 'react'
import MainNav from '../navigation/MainNav'
import UserListContainer from './Lists/UserListContainer'

import {connect} from 'react-redux'



class ConversationContainer extends Component {

    componentDidMount(){
        console.log(!!this.props.match.params.id);
    }

    // showListOrMessages = () => {

    // }

    render() {
        return (
            <div>
                {/* {this.renderConvos()} */}
                <MainNav/>
                {this.props.user.id ? <UserListContainer user = {this.props.user} token = {this.props.token}/>: null}
            </div>
        )
    }
}

const mapStateToProps = state =>{
        return{
            token: state.userManager.token,
            currentUser: state.userManager.userObj,
            conversations: state.messengerManager.conversations
        }
}

export default connect(mapStateToProps)(ConversationContainer)
