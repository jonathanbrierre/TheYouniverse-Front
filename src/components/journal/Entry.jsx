import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {deleteEntry} from '../../actions/JournalActions'
import Swal from 'sweetalert2'
import swal from 'sweetalert'
import EditEntryModal  from './EditEntryModal'

class Entry extends React.Component {

    splitDate =() => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let date = this.props.entry.created_at.split('T')[0]
        let reverseDate = date.split('-').reverse()
        let month = months[reverseDate[1]-1]
        reverseDate.unshift(month)
        reverseDate.splice(2,1)
        if(reverseDate[1][0]=== '0'){
            reverseDate[1] = reverseDate[1].slice(1)
        }
        return reverseDate.join(' ')
    }

    deleteEntry = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover your entry!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
        .then((willDelete) => {
            if (willDelete) {
                fetch(`http://localhost:3000/entries/${this.props.entry.id}`,{method: 'DELETE', headers: {'Authorization': `bearer ${this.props.token}`}})
                .then(resp => resp.json())
                .then(data => {
                    if(data.message === 'Successfully Deleted'){
                        this.props.deleteEntry(this.props.entry.id)
                        swal("Poof! Your entry has been deleted!", {icon: "success"})
                    }
                })
            } else {
                // console.log(this.props)
                swal("Your entry is safe!")
            }
        })

    }

    render(){
            return (
            <div style ={{marginTop: '2%', marginBottom: '4%'}}>
                <Card style ={{width: '70vw'}}>
                    <Card.Content>
                        {/* <Image
                        floated='right'
                        size='mini'
                        src='/images/avatar/large/steve.jpg'
                        /> */}
                        <div style ={{textAlign: 'right'}}>

                        <h3>{this.splitDate()}</h3>
                        </div>
                        {/* <Card.Meta>Friends of Elliot</Card.Meta> */}
                        <Card.Description>
                        {this.props.entry.text}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        {/* <div className='ui two buttons'> */}
                        <EditEntryModal entry = {this.props.entry}/>
                        <Button basic color='red' onClick = {this.deleteEntry} style = {{float: 'right'}}>
                            Delete
                        </Button>
                        {/* </div> */}
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.userManager.token
    }
}

export default connect(mapStateToProps, {deleteEntry})(Entry)
