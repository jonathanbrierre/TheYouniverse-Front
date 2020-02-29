import React from 'react'
import {connect} from 'react-redux'
import MainNav from './components/navigation/MainNav'
import {setTopic} from './actions/TopicsActions'
const NotFound = (props) => {

    const setTopic = () => {
        props.setTopic({})
    }
    
    return (
        <div  >
            {setTopic()}
            <MainNav/>
            <div className ='notFoundContainer'>
                <h1>Welcome to the void. There is nothing to see here</h1>
            </div>
        </div>
    )
}

export default connect(null ,{setTopic})(NotFound)
