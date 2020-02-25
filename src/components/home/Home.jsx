import React, { Component } from 'react'
import {connect} from 'react-redux'
import {authenticateUser} from '../../actions/AuthActions'


import Login from './Login'
import Swal from 'sweetalert2'

import { Segment, Button, Form, Modal  } from 'semantic-ui-react' 

class Home extends Component {

    state = {
        login: false,
        signup: false,
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        bio: '',
        avatar: ''

    }

    onClickLogin = (e) => {
        let toggle = !this.state.login
        this.setState({login: toggle})

    }

    toggleSignUp = () => {
        let toggle = !this.state.signup
        this.setState({signup: toggle})
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    fileSelectedHandler = (e) => {
        console.log(e.target.files[0])
        this.setState({ avatar: e.target.files[0]})
    }

    onSubmit = e => {
        e.preventDefault()
        fetch('http://localhost:3000/users',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.user){
                Swal.fire({icon: 'success', text:'Successfully Joined'})
                this.props.authenticateUser(data)
                localStorage.setItem('token', data.jwt)
                this.props.history.push('/topics')
            }else {
                Swal.fire({icon: 'error', text: data.message.join('. ')})
            }
        })

    }



    render() {
        console.log(this.props)
        return (
            <div className = 'thisDiv'>
                <div className = 'homeDiv'>
                    <Segment.Group className = 'homeOptions'>
                        <h2>Welcome to The Youniverse </h2>
                        <h3>A social media app that connects you with other emotionally and spitirually aware beings </h3>
                        <hr></hr>
                        <h4>Would you like to sign up, or log in?</h4>
                        <h4 onClick = {this.toggleSignUp} className = 'homeAuth' >Sign Up</h4> {' '} <h4 onClick = {this.onClickLogin} className = 'homeAuth' >Log In</h4>
                        
                        {this.state.login ? <Login history = {this.props.history} />:null}
                    </Segment.Group>
                </div>
                    <Modal open ={this.state.signup} >
                            <Modal.Header>Greetings, Warrior of Light! Please Tell Us About Yourself</Modal.Header>
                            <Modal.Content >
                                <Form onSubmit = {this.onSubmit}>
                                    <Form.Input label='Username' type= 'text' name='username' onChange ={this.onChange} value={this.state.username}/>
                                    <Form.Input label = 'Password' type = 'password' name = 'password' onChange = {this.onChange} value = {this.state.password} />
                                    <Form.Input label = 'First Name' type = 'text' name = 'first_name' onChange = {this.onChange} value = {this.state.first_name} />
                                    <Form.Input label = 'Last Name' type = 'text' name = 'last_name' onChange = {this.onChange} value = {this.state.last_name} />
                                    <Form.Input label = 'Email' type = 'text' name = 'email' onChange = {this.onChange} value = {this.state.email} />
                                    <Form.Input label = 'Avatar (Enter Image URL)' type = 'text' name = 'avatar' onChange = {this.onChange} value = {this.state.avatar} />
                                    <Form.TextArea label = 'Your Younique Backstory' name = 'bio' value = {this.state.bio} onChange={this.onChange}/>
                                    <Form.Button type = 'submit' >Submit</Form.Button>
                                    <Button style={{backgroundColor: 'red', float:'right', marginBottom: '10px'}} onClick = {this.toggleSignUp}>Close</Button>
                                </Form>
                            </Modal.Content>
                    </Modal>
             </div>
        )
    }
}



const mapStateToProps = state => {
    return {userInfo: state.userManager}
}

export default connect(mapStateToProps, {authenticateUser})(Home)
