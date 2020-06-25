import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Following extends Component {

    onClickConvo = () => {
        let testUrl = `http://localhost:3000/conversations`
        let deployedUrl = `https://theyouniverse.herokuapp.com/conversations`
        fetch(testUrl,{
            method: 'POST',
            headers:{
                'Authorization': `bearer ${this.props.token}`,
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                userId: this.props.currentUser.id,
                converseeId: this.props.following.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.history.push(`/messenger/${data.id}`)
        })
    }

    render() {
        return (
            <div style = {{cursor:'pointer'}} onClick = {this.onClickConvo}>
                <Feed>
                    <Feed.Event
                    image={this.props.following.avatar}
                    content={ <h5>{this.props.following.username} </h5> }
                    />
                </Feed>
                <hr></hr>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userManager.userObj,
        token: state.userManager.token
    }
}

export default connect(mapStateToProps)(withRouter(Following))
