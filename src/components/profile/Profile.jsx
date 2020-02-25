import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal } from 'semantic-ui-react'
import Swal from 'sweetalert2'
import swal from 'sweetalert'
import {editUserInfo, logOutUser} from '../../actions/AuthActions'
import {withRouter} from 'react-router-dom'
import { FollowingCard } from './FollowingCard'

class Profile extends Component {

    state = {
        editBool: false,
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        bio: ''
    }

    // componentDidMount(){
    //     debugger
    //     console.log(this.props.user)
    // }
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
                console.log(this.props)
              swal("Your profile is safe!");
            }
          });
    }

    displayFollowees = () => {
        if(this.props.user.id){
            return (this.props.user.followees.map( followee =>  <FollowingCard  key = {followee.id}followee ={followee}/> ))
        }else{
            return 
        }
    }

    render() {
        console.log(this.props.user)
        return (
            <div>
                <div className = 'profileDiv'>
                    <img className = 'profilePicture' src = {`${this.props.user.avatar}`}/>
                    <div className = 'profileInfoDivOne' >
                        <h2>{this.props.user.first_name}{' '}{this.props.user.last_name}</h2>
                        <br></br>
                        <h4 className ='username'>Username:</h4> <p>{this.props.user.username}</p>
                        
                    </div>
                    <div className = 'profileInfoDivTwo'>
                        <h4 className ='email'>Email:</h4> <p>{this.props.user.email}</p>
                    </div>
                    <div className = 'bioDiv'>
                        <h4 className = 'bio'>Your Bio:</h4> <p>{this.props.user.bio}</p>
                    </div>
                    <div className = 'buttonDiv'>
                        <Button style ={{textAlign: 'left'}} onClick = {() => {this.toggleModal(); this.fillEditForm()}}>Edit Profile</Button>
                        <Button style ={{textAlign: 'left', backgroundColor: 'red'}} onClick ={this.deletePrompt} >Delete Profile</Button>
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
                                    {/* <Form.TextArea style = {{height: '6vh'}} type= 'text'  value= {this.state.edit} onChange ={this.onChangeEdit} name='edit' />
                                    <Form.Button disabled ={this.state.edit.length? false:true} style={{ display: 'inline-block'}}>Submit</Form.Button> */}
                                    <Button style={{backgroundColor: 'red', float:'right', marginBottom: '10px'}} onClick = {this.toggleModal}>Close</Button>
                                </Form>
                            </Modal.Content>
                        </Modal>
                    </div>
                    <p>Following: </p>
                                <div>{this.displayFollowees()}</div>
                </div>
            </div>
        )
    }
}



export default connect(null, {editUserInfo, logOutUser})(withRouter(Profile))
