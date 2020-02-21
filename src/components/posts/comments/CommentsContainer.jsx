import React, { Component } from 'react'
import Comment from './Comment'
import { Feed, Form, Button } from 'semantic-ui-react'
import NewComment from './NewComment'
class CommentsContainer extends Component {

    state = {
        comments: []
    }

    componentDidMount(){
        fetch(`http://localhost:3000/get_comments/${this.props.post.id}`)
        .then(r => r.json())
        .then(commentsArray => {
            if(commentsArray[0]){
                this.setState({comments: commentsArray})
            }
        })
    }

    componentWillUnmount(){
        this.setState({comments:[]})
    }

    addComment = (commentObj) => {
        this.setState({comments: [...this.state.comments, commentObj]})
    }

    render() {
        return (
            <div >
                <div style={{height: '50vh', overflow: 'scroll'}}>
                    {this.state.comments.map(comment => <Comment key={comment.id} comment = {comment}/>)}
                </div>
                <NewComment post = {this.props.post} addComment = {this.addComment}/>
            </div>
        )
    }
}

export default CommentsContainer
