import React, { Component } from 'react'
import MainNav from '../navigation/MainNav'
import Profile  from './Profile'
import { connect } from 'react-redux'

class UserProfileContainer extends Component {
    render() {
        console.log(this.props)
        return (
            <div className='profContainerDiv'>
                <MainNav/>
                <Profile user ={this.props.user} token ={this.props.token}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.userManager.userObj,
    token: state.userManager.token
})

export default connect(mapStateToProps)(UserProfileContainer)
