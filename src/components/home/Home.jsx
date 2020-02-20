import React, { Component } from 'react'
import {connect} from 'react-redux'
import SignUp from './SignUp'
import Login from './Login'

import { Segment } from 'semantic-ui-react' 

class Home extends Component {

    state = {
        auth: ''
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
            return <SignUp history = {this.props.history}/>
        } else if( this.state.auth === 'Log In'){
            return <Login history = {this.props.history} />
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
