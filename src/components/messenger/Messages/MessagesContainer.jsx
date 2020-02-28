import React, { Component } from 'react'

import { connect } from 'react-redux'
import Message  from './Message'
import NewMessageForm from './NewMessageForm'
import {ActionCableConsumer} from 'react-actioncable-provider'

export class MessagesContainer extends Component {
    state = {
        messages:[]
    }

    componentDidMount(){
        fetch(`http://localhost:3000/messages/${this.props.convoId}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({messages:data}, () => this.scrollToBottom())
        })
    }

    componentWillUnmount(){
        this.setState({messages:[]})
    }

    handleOnReceived = (something) => {
        this.setState({messages: [...this.state.messages, something]})
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }


    render() {
        return (
            <div style ={{paddingTop: '15vh'}}>
                hello
                <div className='listDiv' >
                        {this.state.messages.map(message => <Message key = {message.id} message={message}/>)}
                        <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                </div>
                    <div className ='messageForm'>
                        <NewMessageForm convoId = {this.props.convoId}/>
                    </div>
                <ActionCableConsumer channel = {{channel: 'MessengerChannel', convoId: this.props.convoId}} onReceived = {this.handleOnReceived} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer)
