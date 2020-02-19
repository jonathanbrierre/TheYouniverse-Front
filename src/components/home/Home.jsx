import React, { Component } from 'react'
import {connect} from 'react-redux'
import SignUp from './SignUp'
import Login from './Login'

import { Segment } from 'semantic-ui-react' 

class Home extends Component {

    state = {
        userObj: {
            username: ''
        },
        token: '',
        auth: ''
    }

    componentDidMount(){
        if(localStorage.getItem('token')){
            let token = localStorage.getItem('token')
            fetch('http://localhost:3000/persist',{
                headers: {
                    'Authorization': `bearer  ${token}`
                }
            })
            .then(r => r.json())
            .then(data => {
                if(data.jwt){
                    localStorage.setItem('token', data.jwt)
                    this.setState({
                        userObj: {
                            username: data.user.username
                        },
                        token: data.jwt
                    })
                }
            })
        }
    }



    signUpFunction = (userInfo) => {
        fetch('http://localhost:3000/users',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.user.id){
                localStorage.setItem('token', data.jwt)
                this.setState({
                    userObj:{
                        username: data.user.username
                    },
                    token: data.jwt
                })
            }else {
                alert(data.message)
            }
        })
    }

    logInFunction = (userInfo) => {
        fetch('http://localhost:3000/login',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.user.id){
                localStorage.setItem('token', data.jwt)
                this.setState({
                    userObj:{
                        username: data.user.username
                    },
                    token: data.jwt
                })
            }else {
                alert(data.message)
            }
        })
    }

    onClickAuth = (e) => {
        console.log(e.target.innerHTML)
        if(e.target.innerHTML=== 'Sign Up'){
            this.setState({auth: 'Sign Up'})
        }else if (e.target.innerHTML === 'Log In'){
            this.setState({auth: 'Log In'})
        }
    }

    renderForms = () => {
        if(this.state.auth === 'Sign Up'){
            return <SignUp signUpFunction={this.signUpFunction}/>
        } else if( this.state.auth === 'Log In'){
            return <Login logInFunction = {this.logInFunction} />
        } else {
            return
        }
    }

    render() {
        console.log(this.props)
        return (
            <Segment.Group>
                <h2>Would you like to sign up, or log in?</h2>
                <h3 onClick = {this.onClickAuth} style ={styleForOptions}>Sign Up</h3> {' '} <h3 onClick = {this.onClickAuth} style ={styleForOptions}>Log In</h3>
                {this.renderForms()}
            </Segment.Group>
                
        )
    }
}

const styleForOptions = {
    cursor: 'pointer'
}

const mapStateToProps = state => {
    return {userInfo: state.userManager}
}

export default connect(mapStateToProps)(Home)
