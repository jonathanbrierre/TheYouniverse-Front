import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Feed } from 'semantic-ui-react'


class UserListItem extends Component {

    onClick = () =>{
        console.log(this.props)
        this.props.history.push(`/messenger/${this.props.convo.id}`)
    }
    
    render() {
        console.log(this.props)
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


export default withRouter(UserListItem)
