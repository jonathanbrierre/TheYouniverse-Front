import React, { Component } from 'react'
import MainNav from '../navigation/MainNav'
import Topic from './Topic'
import {connect} from 'react-redux'
import {getAllTopics} from '../../actions/TopicsActions'
export class TopicsContainer extends Component {

    // componentDidMount(){
    
    // }

    render() {
        return (
            <div>
                <MainNav/>
                <h2>Choose a Discussion Topic</h2>
                {this.props.topics.map(topic => <Topic key ={topic.id} topic = {topic}/>)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        topics: state.topicsManager.topics
    }
}

export default connect(mapStateToProps, {getAllTopics})(TopicsContainer)
