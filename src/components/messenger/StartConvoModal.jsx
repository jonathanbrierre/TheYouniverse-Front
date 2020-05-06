import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal } from 'semantic-ui-react'
import FollowingContainer from './FollowingContainer'

class StartConvoModal extends Component {

    state = {
        open: false,
        selection: ''
    }

    toggleModal = () => {
        let value = !this.state.open
        this.setState({open: value})
    }

    toggleDisplay = (e) => {
        this.setState({selection: e.target.innerHTML})
    }

    showSelection = () => {
        if(this.state.selection === 'Follower'){
            return <FollowingContainer followings = {this.props.followers} />
        }else if( this.state.selection === 'Someone You Follow'){
            return <FollowingContainer followings = {this.props.followees} />
        }else{
            return
        }
    }

    render() {
        return (
            <div>
                <Button onClick = {this.toggleModal} style={{backgroundColor: 'blue', color: 'white'}}>Start A New Conversation</Button>
                <Modal open ={this.state.open} >
                    <Modal.Header>Begin a New Conversation!</Modal.Header>
                    <Modal.Content >
                        
                        <h3>Start a conversation with a <button onClick = {this.toggleDisplay}>Follower</button> or <button onClick = {this.toggleDisplay}>Someone You Follow</button></h3>
                        <hr></hr>
                        {this.showSelection()}
                        <br></br>
                        <Button style={{backgroundColor: 'red', float:'right', marginBottom: '10px'}} onClick = {this.toggleModal}>Close</Button>

                        
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        followers: state.userManager.userObj.followers,
        followees: state.userManager.userObj.followees
    }
}



export default connect(mapStateToProps)(StartConvoModal)
