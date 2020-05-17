import React, { Component } from 'react'
import Message  from './Message'
import NewMessageForm from './NewMessageForm'
import { Button} from 'semantic-ui-react'
import {ActionCableConsumer} from 'react-actioncable-provider'
import {connect} from 'react-redux'

import {withRouter} from 'react-router-dom'

class MessagesContainer extends Component {
    state = {
        messages:[],
        conversee: {}
    }

    componentDidMount(){

        fetch(`https://theyouniverse.herokuapp.com/messages/${this.props.convoId}/`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({messages: data}, () => this.scrollToBottom())
        })

        fetch(`https://theyouniverse.herokuapp.com/messages/${this.props.convoId}/${this.props.user.id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({conversee: data})
        })
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentWillUnmount(){
        this.setState({messages:[]})
    }

    handleOnReceived = (something) => {
        console.log(something, "HELO", this.state)
        this.setState({messages: [...this.state.messages, something]})
        // this.props.updateNotif(this.props.convoId)
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
    }

    onClickBack= () =>{
        this.props.history.push('/messenger')
    }

    render() {
        console.log(this.state.messages)
        return (
            <div style ={{paddingTop: '15vh'}}>
                <h2>Conversation with {this.state.conversee.first_name} {this.state.conversee.last_name}</h2>
                <div className='listDiv' >
                        {this.state.messages.map(message => <Message key = {message.id} message={message}/>)}
                        <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                </div>
                    <div className ='messageForm'>
                        <NewMessageForm convoId = {this.props.convoId}/>
                    </div>
                    <br></br>
                    <div style = {{textAlign: 'center'}}><Button onClick = {this.onClickBack}>Back to Conversations</Button></div>
                <ActionCableConsumer channel = {{channel: 'MessengerChannel', convoId: this.props.convoId}} onReceived = {this.handleOnReceived} />
            </div>
        )
    }
}


export default connect(null)(withRouter(MessagesContainer))
