import React from 'react'
import { Icon, Menu, Sidebar, Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {showNav, storeNav} from '../../actions/NavActions'
import {logOutUser} from '../../actions/AuthActions'
import {withRouter, Link} from 'react-router-dom'

const MainNav = (props) => {
    const onClickShow = () => {
        props.showNav()
    }

    const onClickStore = () => {
        props.storeNav()
    }

    const onClickLogOut = () => {
        localStorage.clear()
        props.storeNav()
        props.logOutUser()
        props.history.push('/')
    }
    
    return (
        <div>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                visible = {props.display}
                width='thin'
                >
                <Menu.Item as='a' onClick ={onClickStore}>
                    <Icon name='x'  /> 
                    Close
                </Menu.Item>
                <Menu.Item as='a'>
                    <Icon name='address card outline' />
                    Your Profile
                </Menu.Item>
                <Menu.Item as={Link} to ='/topics' onClick={onClickStore}>
                    <Icon name='list' />
                    Discussion Topics
                </Menu.Item>
                <Menu.Item as='a' onClick = {onClickLogOut}>
                    <Icon name='sign-out' />
                    Sign Out
                </Menu.Item>
            </Sidebar>
            <Button onClick = {onClickShow} icon = 'bars' size = 'massive' style= {{backgroundColor: 'white'}}></Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {display: state.navManager}
}

export default connect(mapStateToProps, {showNav, storeNav, logOutUser})(withRouter(MainNav))
