import React from 'react';
import './App.css';
import Home from './components/home/Home';
import TopicsContainer from './components/topics/TopicsContainer'

import {authenticateUser} from './actions/AuthActions'
import {getAllTopics, setTopic} from './actions/TopicsActions'
import {connect} from 'react-redux'

import {withRouter} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'

import TopicPostsCont from './components/posts/TopicPostsCont';
import NotFound from './NotFound';
import UserProfileContainer from './components/profile/UserProfileContainer';
import ConversationContainer from './components/messenger/ConversationContainer';
import JournalContainer from './components/journal/JournalContainer'

class App extends React.Component {

    componentDidMount(){
      if(localStorage.getItem('token')){
          let token = localStorage.getItem('token')
          fetch('http://theyouniverse.herokuapp.com/persist',{
              headers: {
                  'Authorization': `bearer  ${token}`
              }
          })
          .then(r => r.json())
          .then(data => {
              if(data.jwt){
                  localStorage.setItem('token', data.jwt)
                  this.props.authenticateUser(data)
              }
          })
        }
        fetch('http://theyouniverse.herokuapp.com/topics')
          .then(resp => resp.json())
          .then(this.props.getAllTopics)
          
          
  }

  renderTopicPosts = (routerProps) =>{
    let slug = routerProps.match.params.slug
    let chosenTopic = this.props.topicsManager.topics.find(topic => topic.slug === slug)
    if(chosenTopic){
      return <TopicPostsCont {...routerProps} chosenTopic ={chosenTopic} />
    }else {
      return <NotFound/>
    }
  }

  render(){
    return (
    <div className="App">
        <Switch>
          <Route exact path='/' render = { routerProps => <Home {...routerProps}/>}/>
          <Route exact path='/journal' render = { routerProps => <JournalContainer {...routerProps}/>}/>
          <Route exact path = '/topics' render = {routerProps => <TopicsContainer {...routerProps}/>} />
          <Route path = '/topics/:slug' render = {this.renderTopicPosts} />
          <Route  path = '/profile/:id' render = {routerProps => <UserProfileContainer {...routerProps} />} />
          <Route exact path = '/messenger' render = {routerProps=> <ConversationContainer user = {this.props.userManager.userObj} {...routerProps}/>} />
          <Route path = '/messenger/:id' render = {routerProps=> <ConversationContainer user = {this.props.userManager.userObj} {...routerProps}/>} />
          <Route path = '/notFound' component = {NotFound} />
          <Route component = {NotFound} />
        </Switch>
    </div>
  )}
}


const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, {authenticateUser, getAllTopics, setTopic})(withRouter(App));
