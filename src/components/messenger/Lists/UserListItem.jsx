import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'
import { connect } from 'react-redux'

class UserListItem extends Component {
    render() {
        return (
            <div className = 'listItem'>
                <Feed>
                    <Feed.Event
                    image={this.props.convo.with.avatar}
                    content={ <h5>{`${this.props.convo.with.first_name} ${this.props.convo.with.last_name}`} </h5> }
                />
                </Feed>
                {/* {this.props.convo.id} */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListItem)
