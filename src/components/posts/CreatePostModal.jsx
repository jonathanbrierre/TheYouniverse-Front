import React, { Component } from 'react'
import { Button, Header, Form, Modal } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {createPost} from '../../actions/TopicsActions'

class CreatePostModal extends Component {

    state = {
        content: ''
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
                this.props.createPost(postObj)
            })
    }
    render() {
        return (
            <div>
                <Modal trigger={<Button>Create Post</Button>} closeIcon>
                    <Modal.Header>Create a Post</Modal.Header>
                    <Modal.Content >
                    <Modal.Description>
                        <Form onSubmit = {this.onSubmit}>
                            <Form.TextArea label='Post Content' name = 'content' placeholder="What's on your mind?" onChange ={this.onChange} value={this.state.content}/>
                            <Form.Button>Submit</Form.Button>
                        </Form>
                    </Modal.Description>
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
