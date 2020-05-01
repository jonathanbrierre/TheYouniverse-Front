import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'

class NewEntryModal extends Component {

    state = {
        open: false,
        entry: ''
    }

    toggleModal = () => {
        let value = !this.state.open
        this.setState({open: value})
    }
    render() {
        return (
            <div>
                <Button onClick = {this.toggleModal}>New Entry</Button>
                <Modal open ={this.state.open} >
                    <Modal.Header>Edit Your Profile</Modal.Header>
                    <Modal.Content >
                        <Form onSubmit = {this.onEntrySubmit}>
                            <Form.TextArea label = 'Bio' name = 'bio' value = {this.state.bio} onChange={this.onChangeForm}/>
                            <Form.Button type = 'submit' >Submit</Form.Button>
                            <Button style={{backgroundColor: 'red', float:'right', marginBottom: '10px'}} onClick = {this.toggleModal}>Close</Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default NewEntryModal
