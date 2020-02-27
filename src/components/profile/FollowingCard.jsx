import React, { Component } from 'react'
import { connect } from 'react-redux'

export class FollowingCard extends Component {

    displayFollowings = () =>{
        if(this.props.followee){
            return (<h5>{this.props.followee.username}</h5>)
        }else if(this.props.follower){
            return (<h5>{this.props.follower.username}</h5>)
        }
    }
    render() {
        console.log(this.props)
        return (
            <div> 
                {this.displayFollowings()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingCard)
