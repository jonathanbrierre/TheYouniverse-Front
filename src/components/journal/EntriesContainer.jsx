import React, { Component } from 'react'
import { connect } from 'react-redux'
import Entry from './Entry'
import EntrySearch from './EntrySearch'

class EntriesContainer extends Component {

    state = {
        searchTerm: ''
    }
    dynamicSearch = () =>{
        return this.props.entries.filter(entry => entry.text.includes(this.state.searchTerm))
    }

    searchTermChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    render() {
        return (
            <div>
                <EntrySearch 
                    searchTerm = {this.state.searchTerm}
                    searchTermChange = {this.searchTermChange}
                />
                {this.dynamicSearch().map(entry => <Entry key={entry.id} entry={entry}/>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    entries: state.journalManager.entries
})


export default connect(mapStateToProps)(EntriesContainer)
