import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {unselectUser} from '../../actions/AuthActions'
import {connect} from 'react-redux'

class FollowingCard extends Component {

    displayFollowings = () =>{
            return (<Link onClick = {this.props.unselectUser}to ={`/profile/${this.props.following.id}`} ><h5>{this.props.following.username}</h5></Link>) 
    }
    render() {
        console.log(this.props.following)
        return (
            <div> 
                {this.displayFollowings()}
            </div>
        )
    }
}


export default connect(null, {unselectUser})(FollowingCard)
