import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'

export class Comment extends Component {
    render() {
        // console.log(this.props.comment)
        return (
            <Feed>
                <Feed.Event
                image='https://www.biography.com/.image/t_share/MTY2NTIzMDQzOTIzODk1NTM4/oprah-photo-by-vera-anderson_wireimage.jpg'
                content={ <div><h5>{this.props.comment.user.username} said</h5> {this.props.comment.content} </div>}
                />
            </Feed>
        )
    }
}

export default Comment
