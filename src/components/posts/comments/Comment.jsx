import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'

export class Comment extends Component {
    render() {
        // console.log(this.props.comment)
        return (
            <Feed>
                <Feed.Event
                image='/images/avatar/small/elliot.jpg'
                content={ <div><h5>{this.props.comment.user.username} said</h5> {this.props.comment.content} </div>}
                />
            </Feed>
        )
    }
}

export default Comment
