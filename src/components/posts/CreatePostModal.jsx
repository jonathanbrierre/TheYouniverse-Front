import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {createPost} from '../../actions/TopicsActions'
import Swal from 'sweetalert2'

class CreatePostModal extends Component {

    state = {
        content: '',
        alert: '',
        alertStyle: {},
        modalOpen: false,
        lengthLimit: 400
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        if(this.state.lengthLimit - this.state.content.length >= 0){
            let testUrl = `http://localhost:3000/posts`
            let deployedUrl = 'https://theyouniverse.herokuapp.com/posts'
            fetch(testUrl,{
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
        }else{
            Swal.fire({icon: 'error', text: 'Character Limit Exceeded'})
        }
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
                <Modal open ={this.state.modalOpen} trigger={<Button onClick ={this.onClickModalOpen} className = 'createPostButton' style = {{backgroundColor: '#1b1c1d', color: 'white', fontSize: '2.5vw', float: 'right', position:'fixed', left: '80vw'}} >Create Post</Button>} >
                    <Modal.Header>Create a Post</Modal.Header>
                    <Modal.Content >                
                        <Form onSubmit = {this.onSubmit}>
                            <Form.TextArea label='Post Content' name = 'content' placeholder="What's on your mind?" onChange ={this.onChange} value={this.state.content}/>
                            <Form.Button disabled ={this.state.content.length? false:true} style={{ display: 'inline-block'}}>Submit</Form.Button>
                            <Button style={{backgroundColor: 'red', float:'right', marginBottom: '10px'}} onClick = {this.closeModal}>Close</Button>
                        </Form>
                    </Modal.Content>
                    <span style ={{paddingLeft: '2%'}}>Character Limit: {this.state.lengthLimit - this.state.content.length}</span>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedTopic: state.topicsManager.selectedTopic,
        token: state.userManager.token
    }
}

export default connect(mapStateToProps, {createPost})(CreatePostModal)
