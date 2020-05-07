import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'

class WhatIsThis extends Component {
    state ={
        open: false
    }

    toggleModal = () => {
        let value = !this.state.open
        this.setState({open: value})
    }


    render() {
        return (
            <div>
                <p onClick = {this.toggleModal} style = {{color: 'gray', cursor:'pointer'}}>What is this? <span style ={{color:'red'}}>*</span></p>
                <Modal open ={this.state.open} >
                    <Modal.Header>Journaling</Modal.Header>
                    <Modal.Content >
                        <h3>This feature allows you to have your own private feed filled with only your thoughts about things.</h3>
                        
                        <hr></hr>
                        <h4>Ask yourself some of these questions to get your mind going:</h4>
                        
                        1. What do I want to write about? 
                        <br></br>
                        2. How did my day/week/month/year/life go? 
                        <br></br> 
                        3. Did I feel any strong positive or negative emotions today (or whenever)? 
                        <br></br>
                        4. How am I feeling right now? 
                        <br></br>
                        5. What’s influenced me to feel these feelings I feel?
                        <br></br>
                        6. Are these thoughts/emotions recurring? 
                        <br></br>
                        <hr></hr>
                        For an extended guide to journaling, feel free to purchase my book <a href = 'https://www.amazon.com/dp/B07YHFJTPF/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1' target ='_blank'>A Short Handbook For Happiness</a> on Amazon
                    </Modal.Content>
                    <Button style={{backgroundColor: 'red', float:'right', marginBottom: '10px'}} onClick = {this.toggleModal}>Close</Button>  
                </Modal>
            </div>
        )
    }
}

export default WhatIsThis
