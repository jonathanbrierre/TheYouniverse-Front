import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal } from 'semantic-ui-react'
import Swal from 'sweetalert2'
import swal from 'sweetalert'
import {editUserInfo, logOutUser, handleUnfollow, handleFollow} from '../../actions/AuthActions'
import {withRouter} from 'react-router-dom'
import { FollowingCard } from './FollowingCard'
import FollowingCont from './FollowingCont'

class Profile extends Component {

    state = {
        editBool: false,
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        bio: '',
        followee: false,
        displayFollowings: ''
    }


    fillEditForm = ()=> {
        this.setState({
            username: this.props.user.username,
            email: this.props.user.email,
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            bio: this.props.user.bio
        })
    }

    toggleModal = () => {
        let newBool = !this.state.editBool
        this.setState({editBool: newBool})
    }

    onChangeForm = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onEditFormSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/users/${this.props.user.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `bearer ${this.props.token}`,
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(resp => resp.json())
            .then(data => {
                if(data.id){
                    
                    this.props.editUserInfo(data)
                    Swal.fire({icon: 'success', text:'Successful Update!'})
                    this.toggleModal()
                }else{
                    Swal.fire({icon: 'error', text: data.message.join('. ')})
                }
            })
    }

    deletePrompt = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover your data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                fetch(`http://localhost:3000/users/${this.props.user.id}`, {method: 'DELETE', headers:{'Authorization': `bearer ${this.props.token}`}})
                    .then(resp=> resp.json())
                    .then(data => {
                        localStorage.clear()
                        this.props.logOutUser()
                        this.props.history.push('/')
                        swal("Poof! Your profile has been deleted!", {icon: "success"});
                    })
            } else {
                // console.log(this.props)
            swal("Your profile is safe!");
            }
        });
    }

    displayFollowees = () => {
        if(this.props.user.id){
            return (<FollowingCont followings = {this.props.user.followees} name = 'Following:'/>)
        }else{
            return 
        }
    }

    displayFollowers = () => {
        if(this.props.user.id){
            return (<FollowingCont followings = {this.props.user.followers} name = 'Followers:'/>)
        }else{
            return 
        }
    }

    displayFollowingsContainer = (e) => {
        if(e.target.innerHTML === 'Following'){
            this.setState({displayFollowings: 'Following'})
        }else if(e.target.innerHTML === 'Followers'){
            this.setState({displayFollowings: 'Followers'})
        }else{
            this.setState({displayFollowings: ''})
        }
    }

    renderFollowings = () => {
        if(this.state.displayFollowings === 'Following'){
            return this.displayFollowees()
        }else if (this.state.displayFollowings === 'Followers'){
            return this.displayFollowers()
        }
    }

    onClickConvo = () => {
        fetch(`http://localhost:3000/conversations`,{
            method: 'POST',
            headers:{
                'Authorization': `bearer ${this.props.userToken}`,
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                userId: this.props.currentUser.id,
                converseeId: this.props.thisUser.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.history.push(`/messenger/${data.id}`)
        })
    }

    displayFollowButton =() =>{
        if(this.props.thisUser){
            if( this.props.thisUser.id !== this.props.currentUser.id){
                return (
                    <div>
                        <Button style ={{backgroundColor: 'white', color: 'black', border: 'solid 1px grey'}} onClick = {this.onClickFollowing}>{this.props.followee ? 'Unfollow':'Follow'}</Button>
                    </div>
                )
            }
        }else{
            return 
        }
    }

    displayConversationButton = () => {
        if(this.props.thisUser){
            if( this.props.thisUser.id !== this.props.currentUser.id){
                return (
                    <div>
                        <Button style ={{backgroundColor: 'blue', color: 'white'}}onClick = {this.onClickConvo}>Start Conversation</Button>
                    </div>
                )
            }
        }
    }

    onClickFollowing = () => {
        if(this.props.followee){
            fetch(`http://localhost:3000/followings/${this.props.followeeObj.id}`, {method: 'DELETE', headers:{'Authorization': `bearer ${this.props.userToken}`}})
            .then(resp => resp.json())
            .then(data => {
                this.props.handleUnfollow(this.props.followeeObj, this.props.currentUser)
            })
        }else{
            fetch(`http://localhost:3000/followings`, {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${this.props.userToken}`,
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    followee_id: this.props.user.id
                })
            })
            .then(resp=>resp.json())
            .then(data =>{
                console.log(data)
                this.props.handleFollow(data, this.props.currentUser)
            })
        }
    }

    render() {
        return (
            <div>
                <div className = 'profileDiv'>
                    <img className = 'profilePicture' src = {`${this.props.user.avatar}`} alt =''/>
                    <div className = 'profileInfoDivOne' >
                        <h2>{this.props.user.first_name}{' '}{this.props.user.last_name}</h2>
                        <br></br>
                        <h4 className ='username'>Username:</h4> <p>{this.props.user.username}</p>
                    </div>
                    <div className = 'profileInfoDivTwo'>
                        <h4 className ='email'>Email:</h4> <p>{this.props.user.email}</p>
                    </div>
                    <div className = 'bioDiv'>
                        <h4 className = 'bio'>About:</h4> <p>{this.props.user.bio}</p>
                    </div>
                    <div className = 'buttonDiv'>
                    {this.props.token ? <><Button style ={{textAlign: 'left'}} onClick = {() => {this.toggleModal(); this.fillEditForm()}}>Edit Profile</Button>
                        <Button style ={{textAlign: 'left', backgroundColor: 'red'}} onClick ={this.deletePrompt} >Delete Profile</Button></>: null}
                        <Modal open ={this.state.editBool} >
                            <Modal.Header>Edit Your Profile</Modal.Header>
                            <Modal.Content >
                                <Form onSubmit = {this.onEditFormSubmit}>
                                    <Form.Input label = 'Username' name = 'username' value = {this.state.username} onChange={this.onChangeForm}/>
                                    <Form.Input label = 'Email' name = 'email' value = {this.state.email} onChange={this.onChangeForm}/>
                                    <Form.Input label = 'First Name' name = 'first_name' value = {this.state.first_name} onChange={this.onChangeForm}/>
                                    <Form.Input label = 'Last Name' name = 'last_name' value = {this.state.last_name} onChange={this.onChangeForm}/>
                                    <Form.TextArea label = 'Bio' name = 'bio' value = {this.state.bio} onChange={this.onChangeForm}/>
                                    <Form.Button type = 'submit' >Submit</Form.Button>
                                    <Button style={{backgroundColor: 'red', float:'right', marginBottom: '10px'}} onClick = {this.toggleModal}>Close</Button>
                                </Form>
                            </Modal.Content>
                        </Modal>
                    </div>
                    {this.displayFollowButton()}
                    <br></br>
                    {this.displayConversationButton()}
                    <br></br>
                    <p> <span className = 'followingOptions'onClick = {this.displayFollowingsContainer}>Following</span> | <span className = 'followingOptions' onClick = {this.displayFollowingsContainer} >X</span> | <span className = 'followingOptions' onClick = {this.displayFollowingsContainer} >Followers</span> </p>
                    <div>{this.renderFollowings()}</div>
                </div>
            </div>
        )
    }
}


const mapStateToProps =(state, ownProps) => {
    if(state.userManager.userObj.id){
        let followee = state.userManager.userObj.followees.some(followee => followee.id === ownProps.user.id)
        let followeeObj = state.userManager.userObj.followees.find(followee => followee.id === ownProps.user.id)
        if(followee){
            return {
                currentUser: state.userManager.userObj,
                thisUser: ownProps.user,
                userToken: state.userManager.token,
                followee,
                followeeObj
            }
        }else{
            return {
                currentUser: state.userManager.userObj,
                thisUser: ownProps.user,
                userToken: state.userManager.token,
                followee
            }
        }
    }
}


export default connect(mapStateToProps, {editUserInfo, logOutUser, handleUnfollow, handleFollow})(withRouter(Profile))
