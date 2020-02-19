import React, { Component } from 'react'
import {connect} from 'react-redux'

class Home extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                hohoho
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {userInfo: state.userManager}
}

export default connect(mapStateToProps)(Home)
