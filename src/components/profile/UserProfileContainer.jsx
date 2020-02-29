import React, { Component } from 'react'
import MainNav from '../navigation/MainNav'
import Profile  from './Profile'
import { connect } from 'react-redux'
import {selectUser} from '../../actions/AuthActions'
import Swal from 'sweetalert2'


class UserProfileContainer extends Component {

    renderProfile = () => {
        if(this.props.selectedUser.id ){
                return (<Profile user ={this.props.selectedUser} />)
        }else if(this.props.user.id !== parseInt(this.props.match.params.id)){
            fetch(`http://localhost:3000/profile/${this.props.match.params.id}`)
            .then(resp=> resp.json())
            .then(data => {
                if(data.id){
                    this.props.selectUser(data)
                }else{
                    Swal.fire({icon: 'error', text: data.message})
                }
            })
        }else{
            return (<Profile user ={this.props.user} token ={this.props.token}/>)
        }
    }

    render() {
        return (
            <div className='profContainerDiv'>
                <MainNav/>
                {this.renderProfile()}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.userManager.userObj, 
    token: state.userManager.token,
    selectedUser: state.userManager.selectedUser
})

export default connect(mapStateToProps, {selectUser})(UserProfileContainer)
