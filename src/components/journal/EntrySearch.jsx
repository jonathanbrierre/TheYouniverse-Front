import React, { Component } from 'react'

class EntrySearch extends Component {

    render() {
        return (
            <div>
                <form>
                    <input type='text' name = 'searchTerm' value={this.props.searchTerm} onChange={this.props.searchTermChange}/>
                </form>
            </div>
        )
    }
}

export default EntrySearch
