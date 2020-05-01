import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import {connect} from 'react-redux'

class NewEntryModal extends Component {

    state = {
        open: false,
        entry: ''
    }

    toggleModal = () => {
        let value = !this.state.open
        this.setState({open: value})
    }

    onChangeEntry = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    onEntrySubmit = (e) => {
        fetch('ttp://localhost:3000/entries', {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${this.props.token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                entry: this.state.entry
            })
        })
        .then(resp => resp.json())
        .then(console.log)
    }

    render() {
        return (
            <div>
                <Button onClick = {this.toggleModal}>New Entry</Button>
                <Modal open ={this.state.open} >
                    <Modal.Header>What's on your mind?</Modal.Header>
                    <Modal.Content >
                        <Form onSubmit = {this.onEntrySubmit}>
                            <Form.TextArea label = 'Entry' name = 'entry' value = {this.state.entry} onChange={this.onChangeEntry}/>
                            <Form.Button type = 'submit' >Submit</Form.Button>
                            <Button style={{backgroundColor: 'red', float:'right', marginBottom: '10px'}} onClick = {this.toggleModal}>Close</Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.userManager.token
    }
}

export default connect(mapStateToProps)(NewEntryModal)
