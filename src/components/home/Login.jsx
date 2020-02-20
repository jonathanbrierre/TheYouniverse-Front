import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {authenticateUser} from '../../actions/AuthActions'

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault()
        fetch('http://localhost:3000/login',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            if(data.user){
                localStorage.setItem('token', data.jwt)
                this.props.authenticateUser(data)
                this.props.history.push('/topics')
            }else {
                alert(data.message)
            }
        })
        this.setState({
            username: '',
            password: ''
        })
    }
    render(){
        return (
            <div>
                <hr></hr>
                <h3>Log In:</h3> 
                <Form onSubmit = {this.onSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Username' type= 'text' name='username' onChange ={this.onChange} value={this.state.username}/>
                        <Form.Input fluid label='Password' type = 'password' name = 'password' onChange = {this.onChange} value = {this.state.password} />
                    </Form.Group>
                    <Button type ='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}
export default connect(null, {authenticateUser})(Login)
