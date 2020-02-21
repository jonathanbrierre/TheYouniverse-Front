import React, { Component } from 'react'
import { Feed, Form, Button } from 'semantic-ui-react'
import {connect}  from 'react-redux'

export class NewComment extends Component {
    state = {
        newComment: ''
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/comments`, {
            method: 'POST',
            headers:{
                'Authorization': `bearer ${this.props.token}`,
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                post_id: this.props.post.id,
                content: this.state.newComment
            })
        })
            .then(resp => resp.json())
            .then(commentObj => {
                if(commentObj.id){
                    this.setState({newComment: ''})
                    this.props.addComment(commentObj)
                }
            })
    }


    render() {
        return (
        <div style ={{textAlign: 'right'}}>
            <Form onSubmit = {this.onSubmit}>
                <Form.Input fluid type= 'text' placeholder= 'Leave a Comment' value= {this.state.newComment} onChange ={this.onChange} name='newComment' />
                <Form.Button type='submit' style={{marginRight: '5px'}}>Submit</Form.Button>
            </Form>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.userManager.token
    }
}
export default connect(mapStateToProps)(NewComment)