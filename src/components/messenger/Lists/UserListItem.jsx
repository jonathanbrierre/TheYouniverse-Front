import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Feed } from 'semantic-ui-react'
import { connect } from 'react-redux'

class UserListItem extends Component {

    onClick = () =>{
        console.log(this.props)
        this.props.history.push(`/messenger/${this.props.convo.id}`)
    }
    
    render() {
        return (
            <div className = 'listItem' onClick={this.onClick}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserListItem))
