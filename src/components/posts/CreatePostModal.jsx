import React, { Component } from 'react'
import { Button, Header, Form, Modal } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {createPost} from '../../actions/TopicsActions'
import Swal from 'sweetalert2'

class CreatePostModal extends Component {

    state = {
        content: '',
        alert: '',
        alertStyle: {},
        modalOpen: false
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/posts',{
            method: "POST",
            headers:{
                'Authorization': `bearer ${this.props.token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                content: this.state.content,
                topic_id: this.props.selectedTopic.id
            })
        })
            .then(resp => resp.json())
            .then(postObj => {
                if(postObj.id){
                    this.props.createPost(postObj)
                    this.closeModal()
                    Swal.fire({icon: 'success', text:'Successfully Created a Post'})
                    this.setState({content:''})
                } else {
                    Swal.fire({icon: 'Error', text:'Something went wrong. Check to see if you are logged in, or try again later.'})
                }
            })
    }

    onClickModalOpen = () => {
        this.setState({modalOpen:true})
    }

    closeModal = () => {
        this.setState({modalOpen:false})
    }
    render() {
        return (
            <div className='modal'>
                <Modal open ={this.state.modalOpen} trigger={<Button onClick ={this.onClickModalOpen} >Create Post</Button>} >
                    <Modal.Header>Create a Post</Modal.Header>
                    <Modal.Content >                
                        <Form onSubmit = {this.onSubmit}>
                            <Form.TextArea label='Post Content' name = 'content' placeholder="What's on your mind?" onChange ={this.onChange} value={this.state.content}/>
                            <Form.Button disabled ={this.state.content.length? false:true} style={{ display: 'inline-block'}}>Submit</Form.Button>
                            <Button style={{backgroundColor: 'red', float:'right', marginBottom: '10px'}} onClick = {this.closeModal}>Close</Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedTopic: state.topicsManager.selectedTopic,
        currentUser: state.userManager.userObj,
        token: state.userManager.token
    }
}

export default connect(mapStateToProps, {createPost})(CreatePostModal)
