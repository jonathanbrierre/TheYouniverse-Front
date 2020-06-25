import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import {updateEntry} from '../../actions/JournalActions'
class EditEntryModal extends Component {
    state = {
        open: false,
        entry: '',
        lengthLimit: 3000
    }

    componentDidMount(){
        this.setState({entry: this.props.entry.text})
    }
    toggleModal = () => {
        let value = !this.state.open
        this.setState({open: value})
    }

    onChangeEntry = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    onEntrySubmit = (e) => {
        e.preventDefault()
        if(this.state.entry === ''){
            Swal.fire({icon: 'error', text: 'Entry cannot be blank.'})
            return
        }
        if(this.state.lengthLimit - this.state.entry.length >= 0){
            let testUrl = `http://localhost:3000/entries/${this.props.entry.id}`
            let deployedUrl = `https://theyouniverse.herokuapp.com/entries/${this.props.entry.id}`

            fetch(testUrl, {
                method: 'PATCH',
                headers: {
                    'Authorization': `bearer ${this.props.token}`,
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    text: this.state.entry
                })
            })
            .then(resp => resp.json()) // Come back and throw an error
            .then(data => {
                if(data.entry){
                    Swal.fire({icon: 'success', text: data.message})
                    this.setState({open: false, entry: ''})
                    this.props.updateEntry(data.entry.id, data.entry)
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
                <Button onClick = {this.toggleModal} basic color='green'>Edit</Button>
                <Modal open ={this.state.open} >
                    <Modal.Header>Edit This Entry</Modal.Header>
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



export default connect(mapStateToProps, {updateEntry})(EditEntryModal)
