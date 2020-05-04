import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const Entry = ({entry}) => {
    
    const splitDate =() => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let date = entry.created_at.split('T')[0]
        let reverseDate = date.split('-').reverse()
        let month = months[reverseDate[1]-1]
        reverseDate.unshift(month)
        reverseDate.splice(2,1)
        if(reverseDate[1][0]=== '0'){
            reverseDate[1] = reverseDate[1].slice(1)
        }
        return reverseDate.join(' ')
    }

    return (
        <div>
            <Card>
                <Card.Content>
                    {/* <Image
                    floated='right'
                    size='mini'
                    src='/images/avatar/large/steve.jpg'
                    /> */}
                    <Card.Header>{splitDate()}</Card.Header>
                    {/* <Card.Meta>Friends of Elliot</Card.Meta> */}
                    <Card.Description>
                    {entry.text}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button basic color='green'>
                        Edit
                    </Button>
                    <Button basic color='red'>
                        Delete
                    </Button>
                    </div>
                </Card.Content>
            </Card>
        </div>
    )
}

export default Entry
