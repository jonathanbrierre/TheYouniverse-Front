import React, { Component } from 'react'
import MainNav from '../navigation/MainNav'
import UserListContainer from './Lists/UserListContainer'

import {connect} from 'react-redux'
import  MessagesContainer  from './Messages/MessagesContainer';



class ConversationContainer extends Component {

    showListOrMessages = () => {
        if(this.props.user.id){
            if(this.props.match.params.id){
                return (<MessagesContainer convoId = {this.props.match.params.id} user = {this.props.user}/>)
            }else{
                return (<UserListContainer user = {this.props.user} token = {this.props.token}/>)
            }
        }else{
            return null
        }
    }

    render() {
        return (
            <div>
                <MainNav/>
                {this.showListOrMessages()}
            </div>
        )
    }
}

const mapStateToProps = state =>{
        return{
            token: state.userManager.token
        }
}

export default connect(mapStateToProps)(ConversationContainer)
