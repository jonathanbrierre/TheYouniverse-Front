import React, { Component } from 'react'
import { connect } from 'react-redux'
import Following from './Following'

class FollowingContainer extends Component {

    displayFollowings = () => {
        return this.props.followings.map(following => <Following key = {following.id} following = {following}/>)
    }
    render() {
        return (
            <div style = {{height: '25vh', overflow: 'scroll'}}>
                {this.displayFollowings()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}



export default connect(mapStateToProps)(FollowingContainer)
