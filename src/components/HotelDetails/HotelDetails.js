import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import './HotelDetails.css'

const HotelDetails = (props) => {
    // const [name, id, price] = props;
    // console.log(props);
    return (
        <div className="hotel">
            <Card style={{ width: '24rem' }}>
                <Card.Img variant="top" src={props.fixedHotels.image} />
                <Card.Body>
                    <Card.Title>{props.fixedHotels.name}</Card.Title>
                    <Card.Text>
                        ${props.fixedHotels.price}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Rating: {props.fixedHotels.rating} </ListGroupItem>
                    <ListGroupItem>{props.fixedHotels.room_details}</ListGroupItem>
                    <ListGroupItem>{props.fixedHotels.facilities}</ListGroupItem>
                </ListGroup>
            </Card>
        </div>

        // <ul>
        //     <li>{props.fixedHotels.name}</li>
        //     <img src={props.fixedHotels.image} alt="" />

        // </ul>
    );
};

export default HotelDetails;