import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Feed } from 'semantic-ui-react'
import {ActionCableConsumer} from 'react-actioncable-provider'
import {updateNotif} from '../../../actions/MessengerActions'
import {connect} from 'react-redux'
class UserListItem extends Component {


    onClick = () =>{
        this.props.history.push(`/messenger/${this.props.convo.id}`)
        fetch(`https://theyouniverse.herokuapp.com/checked/${this.props.convo.id}/`)
            .then(resp => resp.json())
            .then(this.setState({updated: false}))
    }

    handleOnReceived = (something) => {
        console.log(something)
        let lastMessage = {user_id: something.user.id}
        this.props.updateNotif(this.props.convo.id, lastMessage)
    }
    
    render() {
        console.log(this.props)
        return (
            <div className = 'listItem' onClick={this.onClick}>
                <Feed>
                    <Feed.Event
                    image={this.props.convo.with.avatar}
                    content={ <h5>{`${this.props.convo.with.first_name} ${this.props.convo.with.last_name}`} </h5> }
                    />
                    <div style = {{textAlign: 'right'}}>{this.props.convo.updated && this.props.convo.lastMessage.user_id === this.props.convo.with.id ? <div className = 'notification'>New Message</div>: null}</div>
                </Feed>
                <ActionCableConsumer channel = {{channel: 'MessengerChannel', convoId: this.props.convo.id}} onReceived = {this.handleOnReceived} />
            </div>
        )
    }
}


export default connect(null, {updateNotif})(withRouter(UserListItem))
