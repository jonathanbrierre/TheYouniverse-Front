import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class Topic extends Component {
    render() {
        // console.log(this.props)
        return (
            <div>
                <Link to ={`/topics/${this.props.topic.slug}`}> {this.props.topic.name} </Link>
            </div>
        )
    }
}

export default Topic
