import React, { Component } from 'react'
import {addConversations} from '../../../actions/MessengerActions'
import {connect} from 'react-redux'
import UserListItem from './UserListItem'
class UserListContainer extends Component {


    componentDidMount(){
        if(this.props.user.id){
            fetch(`http://localhost:3000/conversations/${this.props.user.id}`)
            .then(resp => resp.json())
            .then(data => {
                if(data.length > 0){
                    let users = data.map(convo => {
                        if(convo.conversee.id === this.props.user.id){
                            return {with: convo.user, id: convo.id}
                        }else{
                            return {with: convo.conversee, id: convo.id}
                        }
                    })
                    this.props.addConversations(users)
                }
            })
        }
    }

    renderConversations = () => {
        return this.props.conversations.map(convo => <UserListItem key = {convo.id} convo = {convo}/>)
    }


    render() {
        return (
            <div style ={{paddingTop: '15vh'}}>
                <h1>Continue a conversation with</h1>
                <div className = 'listDiv'>
                    {this.renderConversations()}
                </div>
                <h2>Or start a new conversation here</h2>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        conversations: state.messengerManager.conversations
    }
}

export default connect(mapStateToProps, {addConversations})(UserListContainer)
