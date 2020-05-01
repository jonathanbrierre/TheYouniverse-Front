import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Header} from './Header'
import MainNav from '../navigation/MainNav'
import NewEntryModal from './NewEntryModal'

class JournalContainer extends Component {

    componentDidMount(){
        if(localStorage.getItem('token')){
            let token = localStorage.getItem('token')
            fetch(`http://localhost:3000/user_entries`, {headers: {'Authorization': `bearer  ${token}`}})
                .then(resp => resp.json())
                .then(console.log)
        }
    }

    render() {
        console.log(this.props)
        return (
            //Conditionally render this for if a user is logged in or not
            <div>
                <MainNav/>
                <Header/>
                <Header/>
                <Header/>
                <Header/>
                <Header/>
                <Header/>
                <Header/>
                <NewEntryModal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}



export default connect(mapStateToProps)(JournalContainer)
