import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import MainNav from '../navigation/MainNav'

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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}



export default connect(mapStateToProps)(JournalContainer)
