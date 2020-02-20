import React from 'react'
import {connect} from 'react-redux'
import MainNav from './components/navigation/MainNav'
import {setTopic} from './actions/TopicsActions'
const NotFound = (props) => {

    const setTopic = () => {
        props.setTopic({})
    }
    return (
        <div>
            {setTopic()}
            <MainNav/>
            Nothing to See Here
        </div>
    )
}

export default connect(null ,{setTopic})(NotFound)
