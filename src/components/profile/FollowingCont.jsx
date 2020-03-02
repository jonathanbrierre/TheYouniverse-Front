import React from 'react'
import {connect} from 'react-redux'
import FollowingCard  from './FollowingCard'

const FollowingCont = (props) => {

    return (
        <div>

            <div>
                 <h3>{props.name}</h3>
                {props.followings.map( following =>  <FollowingCard  key = {following.id} following ={following}/> )}
            </div>
        </div>
    )
}

export default FollowingCont
