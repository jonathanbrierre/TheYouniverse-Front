import React from 'react'
import { Button, Form } from 'semantic-ui-react'

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
        this.props.logInFunction(this.state)
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
export default Login
