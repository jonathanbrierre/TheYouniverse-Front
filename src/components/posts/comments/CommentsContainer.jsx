import React, { Component } from 'react'
import Comment from './Comment'
import NewComment from './NewComment'
class CommentsContainer extends Component {

    state = {
        comments: []
    }

    componentDidMount(){
        fetch(`http://theyouniverse.herokuapp.com/get_comments/${this.props.post.id}`)
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

    removeCommentFromState = (id) => {
        let comments = [...this.state.comments]
        let newComments = comments.filter(comment => comment.id !== id)
        this.setState({comments: newComments})
    }

    updateComment = (commentObj)=>{
        // console.log(commentObj)
        let comments = [...this.state.comments]
        let newComments = comments.map(comment => {
            if(comment.id === commentObj.id){
                return commentObj
            }else{
                return comment
            }
        })
        this.setState({comments: newComments})

    }

    render() {
        return (
            <div >
                <div style={{height: '50vh', overflow: 'scroll'}}>
                    {this.state.comments.map(comment => <Comment key={comment.id} comment = {comment} updateComment = {this.updateComment} removeCommentFromState = {this.removeCommentFromState}/>)}
                </div>
                <NewComment post = {this.props.post} addComment = {this.addComment} />
            </div>
        )
    }
}

export default CommentsContainer
