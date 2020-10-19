import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import MaterialUIPickers from '../DateRangePicker/DateRangePicker';
import './Booking.css'
import dataLocation from '../../dataLocation.json'



const Booking = () => {
    const { code } = useParams();
    const place = dataLocation.find(place => place.code === code);
    const history = useHistory()
    // console.log(place);
    const handleStartBooking = () => {
        history.push("/hotels/" + code)
    }
    return (
        <div className="container-fluid d-flex justify-content-center div-booking">
            <div className="col-md-7 col-sm-12 d-flex flex-column align-items-center justify-content-center place-info">
                <h1 className="text-white location-name">{place.locationName}</h1>
                <p className="text-white location-details">{place.locationDetails}</p>
            </div>
            <div className="form-booking bg-white col-md-4 d-flex flex-column">
                <p>Origin</p>
                <input className="form-control" type="text" /><br />
                <p>Destination</p>
                <input name="destination" className="form-control" type="text" />
                <MaterialUIPickers></MaterialUIPickers>
                <br />
                < button onClick={handleStartBooking} className="btn btn-warning">Start Booking</button>

            </div>
        </div >
    );
};

export default Booking;