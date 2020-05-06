import React, { Component } from 'react'
import MainNav from '../navigation/MainNav'
import UserListContainer from './Lists/UserListContainer'
import {clearConvos} from '../../actions/MessengerActions'
import {connect} from 'react-redux'
import  MessagesContainer  from './Messages/MessagesContainer';
import StartConvoModal from './StartConvoModal'



class ConversationContainer extends Component {

    componentWillUnmount(){
        this.props.clearConvos()
    }

    showListOrMessages = () => {
        if(this.props.user.id){
            if(this.props.match.params.id){
                return (<MessagesContainer convoId = {this.props.match.params.id} user = {this.props.user}/> )
            }else{
                return (<div><UserListContainer user = {this.props.user} token = {this.props.token}/><br></br><StartConvoModal/></div>)
            }
        }else{
            return null
        }
    }

    render() {
        return (
            <div>
                <MainNav/>
                {this.showListOrMessages()}
            </div>
        )
    }
}

const mapStateToProps = state =>{
        return{
            token: state.userManager.token
        }
}

export default connect(mapStateToProps, {clearConvos})(ConversationContainer)
