import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { Button, Form, Modal } from 'semantic-ui-react'
import Swal from 'sweetalert2'

class Comment extends Component {

    state = {
        edit: '', 
        editBool: false
    }

    deleteComment = () => {
        fetch(`http://localhost:3000/comments/${this.props.comment.id}`, {method: 'DELETE', headers:{ 'Authorization': `bearer ${this.props.token}` }})
        .then(r=>r.json())
        .then(data => {
            this.props.removeCommentFromState(this.props.comment.id)
        })
    }

    onSubmitEdit = () => {
        fetch(`http://localhost:3000/comments/${this.props.comment.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `bearer ${this.props.token}`,
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body:JSON.stringify({
                content: this.state.edit
            })
        })
        .then(r => r.json())
        .then(comment => {
            if(comment.id){
                this.props.updateComment(comment)
                Swal.fire({icon: 'success', text:'Successful Update!'})
                this.toggleEditForm()
            }else{
                Swal.fire({icon: 'error', text:'Something went wrong. Check your connection!'})
                this.toggleEditForm()
            }
        })
    }

    toggleEditForm = () =>{
        let newBool = !this.state.editBool
        this.setState({editBool: newBool})
    }

    fillEditForm = () => {
        this.setState({edit: this.props.comment.content})
    }

    onChangeEdit = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    render() {
        return (
            <Feed>
                <Feed.Event
                    image={this.props.comment.user.avatar}
                    content={ <div><h5>{`${this.props.comment.user.first_name} ${this.props.comment.user.last_name}`} said</h5> {this.props.comment.content} </div>}
                />
                <Modal open ={this.state.editBool} >
                    <Modal.Header>Edit Your Comment</Modal.Header>
                    <Modal.Content >
                        <Form onSubmit = {this.onSubmitEdit}>
                            <Form.TextArea style = {{height: '6vh'}} type= 'text'  value= {this.state.edit} onChange ={this.onChangeEdit} name='edit' />
                            <Form.Button disabled ={this.state.edit.length? false:true} style={{ display: 'inline-block'}}>Submit</Form.Button>
                            <Button style={{backgroundColor: 'red', float:'right', marginBottom: '10px'}} onClick = {this.toggleEditForm}>Close</Button>
                        </Form>
                    </Modal.Content>
                </Modal>
                {
                this.props.comment.user.id === this.props.currentUser.id ? 
                    <div style = {{textAlign: 'right'}}> <span className = 'commentConfig' onClick = {() => { this.toggleEditForm(); this.fillEditForm()}}>Edit</span> <span onClick = {this.deleteComment}className = 'commentConfig'>| Delete</span> </div>
                    : null
                }
                <hr></hr>
            </Feed>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userManager.userObj,
        token: state.userManager.token
    }
}

export default connect(mapStateToProps)(Comment)
