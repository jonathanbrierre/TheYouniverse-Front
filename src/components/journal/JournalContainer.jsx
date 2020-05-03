import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Header} from './Header'
import MainNav from '../navigation/MainNav'
import NewEntryModal from './NewEntryModal'
import {userEntries} from '../../actions/JournalActions'
import EntriesContainer from './EntriesContainer'


class JournalContainer extends Component {

    componentDidMount(){
        if(localStorage.getItem('token')){
            let token = localStorage.getItem('token')
            fetch(`http://localhost:3000/user_entries`, {headers: {'Authorization': `bearer  ${token}`}})
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
                <Header/>
                <Header/>
                <Header/>
                <Header/>
                <Header/>
                <Header/>
                <Header/>
                <NewEntryModal/>
                
                <EntriesContainer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}



export default connect(mapStateToProps, {userEntries})(JournalContainer)
