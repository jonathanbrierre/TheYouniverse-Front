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
        <div style = {{backgroundColor: '#1b1c1d'}} className = 'navBar'>
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
                <Menu.Item as={Link} to ='/topics' onClick={onClickStore}>
                    <Icon name='list' />
                    Discussion Topics
                </Menu.Item >
                {props.token.length ? <Menu.Item as={Link} to ={`/profile/${props.user.id}`} onClick={onClickStore}>
                    <Icon name='address card outline' />
                    Your Profile
                </Menu.Item> : null}
                <Menu.Item as='a' onClick = {onClickLogOut}>
                    <Icon name='sign-out' />
                    {props.token.length ? 'Sign Out': 'Log In/Sign Up'}
                </Menu.Item>
            </Sidebar>
            <Button onClick = {onClickShow} icon = 'bars' size = 'massive' style= {{backgroundColor: '#1b1c1d', color: 'white'}}></Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        display: state.navManager,
        token: state.userManager.token,
        user: state.userManager.userObj
    }
}

export default connect(mapStateToProps, {showNav, storeNav, logOutUser})(withRouter(MainNav))
