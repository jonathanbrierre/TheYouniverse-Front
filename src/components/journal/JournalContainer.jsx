import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Header} from './Header'
import MainNav from '../navigation/MainNav'
import NewEntryModal from './NewEntryModal'

class JournalContainer extends Component {
    render() {
        console.log(this.props)
        return (
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
