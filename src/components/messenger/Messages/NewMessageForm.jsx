import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'

class NewMessageForm extends Component {
    state = {
        message: ''
    }

    onSubmit = (e) => {
        e.preventDefault()
        let testUrl = `http://localhost:3000/messages`
        let deployedUrl = `https://theyouniverse.herokuapp.com/messages`
        fetch(testUrl,{
            method: 'POST',
            headers:{
                'Authorization': `bearer ${this.props.token}`,
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                content: this.state.message,
                convoId: this.props.convoId
            })
        })
            .then(resp => resp.json())
            this.setState({message: ''})
    }

    handleOnChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    render() {
        return (
            <div style = {{textAlign: 'right'}}>
                <Form onSubmit = {this.onSubmit}>
                    <Form.Input  type='text' name = 'message' placeholder = 'Send Message' value = {this.state.message} onChange ={this.handleOnChange}/>
                    <Button style = {{backgroundColor: 'blue', color: 'white'}} type = 'submit'> Submit</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        token: state.userManager.token
    }
}


export default connect(mapStateToProps)(NewMessageForm)
