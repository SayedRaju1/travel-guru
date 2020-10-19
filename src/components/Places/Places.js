import React from 'react';
import { Button, Card, Image, Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Places.css'




const Places = (props) => {
    // console.log(props);
    const { locationName, locationImage, locationDetails, code } = props.location;



    return (

        <div className="container">
            <h2 className="text-center text-white">{locationName}</h2>
            <Link className="img-link d-flex justify-content-center" to={"/booking/" + code}><img className="locationImg img-fluid" src={locationImage} alt="" /></Link>
            <br />

            <Link className="d-flex justify-content-center book-btn" to={"/booking/" + code}
            ><button className="btn btn-warning">Book Now</button></Link><br /><br />
        </div>

    );
};

export default Places;

