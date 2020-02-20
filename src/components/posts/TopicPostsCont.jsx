import React, { Component } from 'react'
import MainNav from '../navigation/MainNav'
import {connect} from 'react-redux'
import {getPostsForTopic, setHeading, setTopic, removePosts} from '../../actions/TopicsActions'
import Post from './Post'
import CreatePostModal from './CreatePostModal'
import BottomScrollListener from 'react-bottom-scroll-listener';

class TopicPostsCont extends Component {
    state = {
        pageCounter: 1
    }

    componentDidMount(){
        let slug = this.props.match.params.slug
        this.setHeading(slug)
        this.fetchTopicPosts(slug)
    }

    componentWillUnmount(){
        this.props.removePosts()
    }

    fetchTopicPosts = () => {
        let slug = this.props.match.params.slug
        fetch(`http://localhost:3000/posts/${slug}/${this.state.pageCounter}`)
        .then(resp => resp.json())
        .then(allPosts => {
            if(allPosts){
                this.props.getPostsForTopic(allPosts)
                this.props.setTopic(this.props.chosenTopic)
            } else{
                console.log('end of posts')
            }
        })
    }

    setHeading = (slug) => {
        let heading = slug[0].toUpperCase() + slug.slice(1)
        this.props.setHeading(heading)
    }

    renderPosts =()=>{
        // console.log(this.props.posts)
        return this.props.posts.map(post => <Post key = {post.id} post={post}/>)
    }

    incrementPageCounter = () => {
        console.log(this.state.pageCounter)
        let newCount = this.state.pageCounter +1 
        this.setState({pageCounter: newCount}, this.fetchTopicPosts)
        
    }

    render() {
        return (
        <BottomScrollListener onBottom={this.incrementPageCounter} >
            <div onScroll = {this.handleScroll}>
            <MainNav/>
                <h2>{this.props.heading}</h2>
                <CreatePostModal/>
                {this.renderPosts()}
            </div>
            </BottomScrollListener>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.topicsManager.topicPosts,
        heading: state.topicsManager.heading

    }
}

export default connect(mapStateToProps, {getPostsForTopic, setHeading, setTopic, removePosts})(TopicPostsCont)
