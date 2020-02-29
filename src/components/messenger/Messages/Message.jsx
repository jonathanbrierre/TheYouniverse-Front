import React, { Component } from 'react'
import { connect } from 'react-redux'

class Message extends Component {

    renderMessageDiv = () => {
        if(this.props.message.user.id === this.props.currentUser.id){
            return(
                <div className = 'right' style ={{textAlign: 'right'}}>
                    <h5>{this.props.message.user.username}</h5>
                    {this.props.message.content}
                </div>
            )
        }else{
        return( <div className = 'left' style ={{textAlign: 'left'}}>
                <h5>{this.props.message.user.username}</h5>
                {this.props.message.content}
            </div>)
        }
    }
    render() {
        return (
            <div>
                {this.renderMessageDiv()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        currentUser: state.userManager.userObj
    }
}

export default connect(mapStateToProps)(Message)
