import React, { Component } from 'react'
import MainNav from '../navigation/MainNav'
import {connect} from 'react-redux'
import {getPostsForTopic, setHeading, setTopic, removePosts} from '../../actions/TopicsActions'
import Post from './Post'
import CreatePostModal from './CreatePostModal'
import BottomScrollListener from 'react-bottom-scroll-listener';

class TopicPostsCont extends Component {
    state = {
        pageCounter: 1,
        loading: false,
        endOfPosts: false
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
                this.setState({loading: false})
                this.props.getPostsForTopic(allPosts)
                this.props.setTopic(this.props.chosenTopic)
            } else{
                this.setState({loading: false, endOfPosts: true})
                console.log('end of posts')
            }
        })
    }

    setHeading = (slug) => {
        let heading = slug[0].toUpperCase() + slug.slice(1)
        this.props.setHeading(heading)
    }

    renderPosts =()=>{
        return this.props.posts.map(post => <Post key = {post.id} post={post}/>)
    }

    incrementPageCounter = () => {
        if(this.state.endOfPosts !== true){
            let newCount = this.state.pageCounter +1 
            this.setState({pageCounter: newCount, loading: true}, this.fetchTopicPosts)
        } else{
            return 
        }
    }

    render() {
        return (
        <BottomScrollListener onBottom={this.incrementPageCounter} >
            <div onScroll = {this.handleScroll}>
                <MainNav/>
                <h1 style = {{textAlign: 'right', marginRight: '5%'}}>{this.props.heading}</h1>
                <CreatePostModal/>
                {this.renderPosts()}
                {this.state.loading ? <h3>Loading...</h3>:null}
                {this.state.endOfPosts ? <h3>No More Posts</h3>:null}
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
