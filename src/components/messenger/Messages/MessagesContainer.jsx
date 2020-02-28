import React, { Component } from 'react'

import { connect } from 'react-redux'
import Message  from './Message'
import NewMessageForm from './NewMessageForm'

export class MessagesContainer extends Component {
    state = {
        messages:[]
    }

    componentDidMount(){
        console.log(this.props)
        fetch(`http://localhost:3000/messages/${this.props.convoId}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({messages:data})
        })
    }

    componentWillUnmount(){
        this.setState({messages:[]})
    }

    render() {
        return (
            <div style ={{paddingTop: '15vh'}}>
                hello
                <div className='listDiv' >
                        {this.state.messages.map(message => <Message message={message}/>)}
                </div>
                    <div className ='messageForm'>
                        <NewMessageForm convoId = {this.props.convoId}/>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer)
