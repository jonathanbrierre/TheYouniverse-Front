import React from 'react'
import { Feed, Form, Button } from 'semantic-ui-react'

import Swal from 'sweetalert2'
import {connect}  from 'react-redux'
import {editPost, deletePost} from '../../actions/TopicsActions'
import CommentsContainer from './comments/CommentsContainer'
import Like from './Like'
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
            Swal.fire({icon: 'success', text:'Successfully Deleted'})
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
                Swal.fire({icon: 'success', text:'Successful Edit'})
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
                <p className='postConfig' onClick = {this.deletePostFetch}>Delete</p> {'|'} <p className='postConfig' onClick = {this.onClickEdit}>Edit Post</p>
            </div>
        )
    }



    render(){
        return (
        <div className = 'postDiv'>
            <Feed>
               
                <Feed.Event style={{backgroundColor: '#1b1c1d', padding: '7px', color: 'white' }}  image={this.props.post.user.avatar}  content = {`@${this.props.post.user.username}`}/>

                    <h4 className = 'postHeader'> {`${this.props.post.user.first_name} ${this.props.post.user.last_name}`} posted</h4>
                    {this.state.editBool ? this.renderEditForm():<p className = 'postContent'>{this.props.post.content}</p>}
                        <hr></hr>
                    <Like post = {this.props.post} token = {this.props.token} user={this.props.currentUser}/>
                    <div className = 'viewComment'>
                        <p className='postConfig' style={{textAlign: 'right'}} onClick={this.onClickViewComments}>{this.state.showComments ? 'Close Comments':'View or Post Comments'}</p>
                    </div>
                    {this.props.currentUser.id === this.props.post.user.id ? <div className='postConfigContainer'>{this.state.editBool ? <p className='postConfig' onClick ={this.onClickCloseEdit}>Close Edit</p>:this.renderButtons()}</div>: null}
                    {this.state.showComments ? <CommentsContainer post ={this.props.post}/>:null}
            </Feed>   
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
