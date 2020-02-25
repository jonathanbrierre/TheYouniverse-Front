import React, { Component } from 'react'
import { connect } from 'react-redux'

export class FollowingCard extends Component {
    render() {
        console.log(this.props.followee)
        return (
            <div> 
                <h5>{this.props.followee.username}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingCard)
