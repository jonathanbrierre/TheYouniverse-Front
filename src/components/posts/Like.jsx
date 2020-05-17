import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addLike, removeLike} from '../../actions/TopicsActions'
import Swal from 'sweetalert2'
import {Icon} from 'semantic-ui-react'
export class Like extends Component {

    state = {
        liked: false,
        likeObj: {}
    }
    
    componentDidMount(){
        let foundLike = this.props.post.likes.find(like => like.user.id === this.props.user.id)
        if(foundLike){
            this.setState({liked: true, likeObj: foundLike})
        }
    }
    renderLikeCount = () =>{
        if(this.props.post.likes[0]){
            if(this.props.post.likes.length ===1){
                return`${this.props.post.likes.length} Like`
            }else{
                return `${this.props.post.likes.length} Likes`
            }
        } else{
            return`0 Likes`
        }
    }

    onClickLike = () => {
        if(this.state.liked){
            fetch(`https://theyouniverse.herokuapp.com/likes/${this.state.likeObj.id}`,{
                method: 'DELETE',
                headers: {
                    'Authorization': `bearer ${this.props.token}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.props.removeLike(this.props.post.id, this.state.likeObj.id)
                this.setState({liked: false, likeObj: {}})
            })
        }else{
            
            fetch(`https://theyouniverse.herokuapp.com/likes`,{
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${this.props.token}`,
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    post_id: this.props.post.id
                })
            })
            .then(resp => resp.json())
            .then(data =>{
                if(data.id){
                    this.props.addLike(this.props.post.id, data)
                    this.setState({liked: true, likeObj:data})
                }else{
                    Swal.fire({icon: 'error', text:'Like Failed'})
                }
            })
        }
    }

    render() {
        return (
            <div style ={{transform: 'translate(20px, 20px)', width: '30%', textAlign: 'center'}}>
                {this.renderLikeCount()}<br></br>
                {this.state.liked ? <Icon name='heart' size='big' style = {{color:'red', cursor: 'pointer'}} onClick = {this.onClickLike} />: <Icon name='heart outline' style = {{cursor: 'pointer', display: 'inline-block'}} size='big' onClick = {this.onClickLike} />}
            </div>
        )
    }
}

export default connect(null, {addLike, removeLike})(Like)