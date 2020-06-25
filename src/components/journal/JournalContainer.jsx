import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Header} from './Header'
import MainNav from '../navigation/MainNav'
import NewEntryModal from './NewEntryModal'
import {userEntries} from '../../actions/JournalActions'
import EntriesContainer from './EntriesContainer'
import WhatIsThis from './WhatIsThis'


class JournalContainer extends Component {

    componentDidMount(){
        if(localStorage.getItem('token')){
            let token = localStorage.getItem('token')
            let testUrl = 'http://localhost:3000/user_entries'
            let deployedUrl = `https://theyouniverse.herokuapp.com/user_entries`
            fetch(testUrl, {headers: {'Authorization': `bearer  ${token}`}})
                .then(resp => resp.json())
                .then(data => {
                    this.props.userEntries(data.entries)
                })
        }
    }

    render() {
        console.log(this.props)
        return (
            //Conditionally render this for if a user is logged in or not
            <div>
                <MainNav/>
                <div style = {{paddingLeft:'4vw', paddingTop:'3vh'}}>
                    <Header/>
                    <NewEntryModal/>
                    <br></br>
                    <WhatIsThis/>
                </div>
                <EntriesContainer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}



export default connect(mapStateToProps, {userEntries})(JournalContainer)
