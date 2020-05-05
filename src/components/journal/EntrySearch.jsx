import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
class EntrySearch extends Component {

    render() {
        return (
            <div>
                <Form>
                    <Form.Input type='text' name = 'searchTerm' value={this.props.searchTerm} onChange={this.props.searchTermChange} placeholder='Search for entry content' icon='search'/>
                </Form>
            </div>
        )
    }
}

export default EntrySearch
