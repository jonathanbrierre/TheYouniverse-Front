import React from 'react'
import { Feed, Form, Button } from 'semantic-ui-react'


import {connect}  from 'react-redux'
import {editPost, deletePost} from '../../actions/TopicsActions'
import CommentsContainer from './comments/CommentsContainer'
class Post extends React.Component  {

    state = {
        content: '',
        editBool: false,
        showComments: false
    }

    deletePostFetch = () => {
        fetch(`http://localhost:3000/posts/${this.props.post.id}`,{method: "DELETE", headers: {'Authorization': `bearer ${this.props.token}`}})
        .then(r=>r.json())
        .then(data => {
            this.props.deletePost(this.props.post.id)
            //Make this pretty later
            //Make this pretty later
            alert(data.message)
            //Make this pretty later
            //Make this pretty later
        })
    }

    onClickEdit = (e) => {
        console.log('clicked')
        this.setState({content: this.props.post.content, editBool: true})
    }

    onClickCloseEdit = () =>{
        this.setState({editBool: false})
    }

    onClickViewComments = () =>{
        if(this.state.showComments===false){
            this.setState({showComments:true})
        }else{
            this.setState({showComments:false})
        }
    }

    onSubmitEdit = (e) => {
        e.preventDefault()
        console.log('submitted')
        fetch(`http://localhost:3000/posts/${this.props.post.id}`,{
            method: 'PATCH',
            headers:{
                'Authorization': `bearer ${this.props.token}`,
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({content: this.state.content})
        })
            .then(resp => resp.json())
            .then(data =>{
                this.props.editPost(data)
                this.setState({editBool: false})
            })
    }

    onChangeEdit = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    renderEditForm =()=>{
        return(
            <Form onSubmit = {this.onSubmitEdit}>
                <Form.TextArea type='text' name= 'content' value ={this.state.content} onChange = {this.onChangeEdit} />
                <Button type = 'submit' >Submit</Button>
            </Form>
        )
    }

    renderButtons = () =>{
        return(
            <div>
                <p className='postConfig' onClick={this.onClickViewComments}>{this.state.showComments ? 'Close Comments':'View Comments'}</p><br></br><p className='postConfig' onClick = {this.deletePostFetch}>Delete</p> {'|'} <p className='postConfig' onClick = {this.onClickEdit}>Edit Post</p>
            </div>
        )
    }



    render(){
        return (
        <div className = 'postDiv'>
            <Feed.Event>
                <Feed.Label image='/images/avatar/small/joe.jpg' />
                    <h4 className = 'postHeader'> {this.props.post.user.username} posted to {this.props.post.topic.name}</h4>
                    {this.state.editBool ? this.renderEditForm():<p>{this.props.post.content}</p>}
                    {this.props.currentUser.id === this.props.post.user.id ? <div className='postConfigContainer'>{this.state.editBool ? <p className='postConfig' onClick ={this.onClickCloseEdit}>Close Edit</p>:this.renderButtons()}</div>: null}
                    {this.state.showComments ? <CommentsContainer post ={this.props.post}/>:null}
            </Feed.Event>   
        </div>
    )}
}

const mapStateToProps = state => {
    return{
        currentUser: state.userManager.userObj,
        token: state.userManager.token
    }
}

export default connect(mapStateToProps, {editPost, deletePost})(Post)
