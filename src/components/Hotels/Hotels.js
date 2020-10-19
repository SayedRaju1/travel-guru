import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HotelDetails from '../HotelDetails/HotelDetails';
import data from '../../datatHotels.json'
import './Hotels.css'

const Hotels = () => {
    const { code } = useParams();
    const [hotels, setHotels] = useState([]);
    const hotel = hotels.filter(hotel => hotel.code === code);
    // console.log(hotel);

    useEffect(() => {
        setHotels(data);
    }, [])
    return (
        <div className="d-flex justify-content-around">
            {
                hotel.map(fixedHotels =>
                    <HotelDetails
                        fixedHotels={fixedHotels}
                    >
                    </HotelDetails>
                )
            }

        </div>

    );
};

export default Hotels;