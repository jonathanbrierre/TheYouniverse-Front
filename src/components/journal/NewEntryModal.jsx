import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {newEntry} from '../../actions/JournalActions'
import Swal from 'sweetalert2'

class NewEntryModal extends Component {

    state = {
        open: false,
        entry: '',
        lengthLimit: 3000
    }

    toggleModal = () => {
        let value = !this.state.open
        this.setState({open: value})
    }

    onChangeEntry = (e) => {
        this.setState({[e.target.name]:e.target.value})
        // return this.state.lengthLimit - e.target.value.length
    }

    onEntrySubmit = (e) => {
        e.preventDefault()
        if(this.state.entry === ''){
            Swal.fire({icon: 'error', text: 'Entry cannot be blank.'})
            return
        }
        if(this.state.lengthLimit - this.state.entry.length >= 0){
            fetch('http://localhost:3000/entries', {
                method: 'POST',
                headers: {
                    'Authorization': `bearer ${this.props.token}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    entry: this.state.entry
                })
            })
            .then(resp => resp.json()) // Come back and throw an error
            .then(data => {
                if(data.entry){
                    Swal.fire({icon: 'success', text: data.message})
                    this.setState({open: false, entry: ''})
                    this.props.newEntry(data.entry)
                }else{
                    Swal.fire({icon: 'error', text: data.message})
                }
            })
        }else {
            Swal.fire({icon: 'error', text: 'Character Limit Exceeded'})
        }
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
                            <Form.Button disabled ={this.state.entry.length? false:true} type = 'submit' >Submit</Form.Button>
                            <Button style={{backgroundColor: 'red', float:'right', marginBottom: '10px'}} onClick = {this.toggleModal}>Close</Button>
                        </Form>
                        Character Limit: {this.state.lengthLimit - this.state.entry.length}
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

export default connect(mapStateToProps, {newEntry})(NewEntryModal)
