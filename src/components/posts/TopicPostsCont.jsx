import React, { Component } from 'react'
import MainNav from '../navigation/MainNav'
import {connect} from 'react-redux'
import {getPostsForTopic} from '../../actions/TopicsActions'
export class TopicPostsCont extends Component {



    componentDidMount(){
        let slug = this.props.match.params.slug
        fetch('http://localhost:3000/posts')
            .then(r => r.json())
            .then(allPosts => {
                if(allPosts[0]){
                    let topicPosts = allPosts.filter(post => post.topic.slug === slug)
                    this.props.getPostsForTopic(topicPosts)
                    console.log(this.props)
                }
            })
    }


    render() {
        // console.log(this.props)
        return (
            <div>
            <MainNav/>
                {/* {this.renderTopicPosts()} */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {posts: state.topicsManager.topicPosts}
}

export default connect(mapStateToProps, {getPostsForTopic})(TopicPostsCont)
