import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal } from 'semantic-ui-react'
import FollowingContainer from './FollowingContainer'
import SearchBar from './SearchBar'

class StartConvoModal extends Component {

    state = {
        open: false,
        selection: '',
        searchTerm: ''
    }

    toggleModal = () => {
        let value = !this.state.open
        this.setState({open: value})
    }

    toggleDisplay = (e) => {
        this.setState({selection: e.target.innerHTML})
    }

    searchTermChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    showSelection = () => {
        if(this.state.selection === 'Follower'){
            return(
                <div>
                    <h3>Your followers</h3> - 
                    <SearchBar searchTerm = {this.state.searchTerm} searchTermChange = {this.searchTermChange} />
                    <br></br>
                    <FollowingContainer followings = {this.props.followers} searchTerm = {this.state.searchTerm}/>
                </div>
                ) 
        }else if( this.state.selection === 'Someone You Follow'){
            return(
                <div>
                    <h3>Those you follow</h3>
                    <SearchBar searchTerm = {this.state.searchTerm} searchTermChange = {this.searchTermChange} />
                    <br></br>
                    <FollowingContainer followings = {this.props.followees} searchTerm = {this.state.searchTerm} />
                </div>
            ) 
        }else{
            return
        }
    }

    render() {
        return (
            <div>
                <div style = {{width:'100%', textAlign: 'center'}}>
                <Button onClick = {this.toggleModal} style={{backgroundColor: 'blue', color: 'white'}}>Start A New Conversation</Button>

                </div>
                <Modal open ={this.state.open} >
                    <Modal.Header>Begin a New Conversation!</Modal.Header>
                    <Modal.Content >
                        <h3>Start a conversation with a <button onClick = {this.toggleDisplay} style={{color: 'blue'}}>Follower</button> or <button onClick = {this.toggleDisplay} style={{color: 'blue'}}>Someone You Follow</button></h3>
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
