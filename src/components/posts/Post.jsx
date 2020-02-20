import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'

const Post = (props) => {
    return (
        <div>
            <Feed.Event>
                <Feed.Label image='/images/avatar/small/joe.jpg' />
                    <h4> {props.post.user.username} posted to {props.post.topic.name}</h4>
                    <p>{props.post.content}</p>
            </Feed.Event>   
        </div>
    )
}

export default Post
