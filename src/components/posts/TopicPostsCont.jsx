import React, { Component } from 'react'
import MainNav from '../navigation/MainNav'
import {connect} from 'react-redux'
import {getPostsForTopic, setHeading, setTopic} from '../../actions/TopicsActions'
import Post from './Post'
import CreatePostModal from './CreatePostModal'

export class TopicPostsCont extends Component {

    componentDidMount(){
        let slug = this.props.match.params.slug
        this.setHeading(slug)
        fetch('http://localhost:3000/posts')
            .then(r => r.json())
            .then(allPosts => {
                if(allPosts[0]){
                    let topicPosts = allPosts.filter(post => post.topic.slug === slug)
                    this.props.getPostsForTopic(topicPosts)
                    this.props.setTopic(this.props.chosenTopic)
                }
            })
    }

    setHeading = (slug) => {
        let heading = slug[0].toUpperCase() + slug.slice(1)
        this.props.setHeading(heading)
    }

    renderPosts =()=>{
        console.log(this.props.posts)
        return this.props.posts.map(post => <Post key = {post.id} post={post}/>)
    }

    render() {
        return (
            <div>
            <MainNav/>
                <h2>{this.props.heading}</h2>
                <CreatePostModal/>
                {this.renderPosts()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.topicsManager.topicPosts,
        heading: state.topicsManager.heading
    }
}

export default connect(mapStateToProps, {getPostsForTopic, setHeading, setTopic})(TopicPostsCont)
