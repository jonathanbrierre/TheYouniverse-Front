import React, { Component } from 'react'
import { connect } from 'react-redux'
import Entry from './Entry'

class EntriesContainer extends Component {
    render() {
        return (
            <div>
                {this.props.entries.map(entry => <Entry key={entry.id} entry={entry}/>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    entries: state.journalManager.entries
})


export default connect(mapStateToProps)(EntriesContainer)
