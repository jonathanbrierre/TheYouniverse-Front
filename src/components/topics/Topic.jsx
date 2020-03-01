import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class Topic extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <Link to ={`/topics/${this.props.topic.slug}`} style = {{width: '70%'}}> <div className = 'topicDiv'style ={{backgroundImage: `url(${this.props.topic.img})`}}> <div className = 'topicText'>{this.props.topic.name}</div></div> </Link>
            </div>
        )
    }
}

export default Topic
