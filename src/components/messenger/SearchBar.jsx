import React, { Component } from 'react'
import {Form } from 'semantic-ui-react'
class SearchBar extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Form.Input type='text' name = 'searchTerm' value={this.props.searchTerm} onChange={this.props.searchTermChange} placeholder='Search for a user' icon='search'/>
                </Form>
            </div>
        )
    }
}

export default SearchBar
