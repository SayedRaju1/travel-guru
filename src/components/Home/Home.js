import React from 'react';
import { Container } from 'react-bootstrap';
import Places from '../Places/Places';
import './Home.css'
import dataLocation from '../../dataLocation.json'



const Home = () => {

    return (
        <Container className="home-component " fluid>

            <Container className="d-flex justify-content-around">
                <br />
                <br />
                {
                    dataLocation.map(location => <Places
                        location={location}
                    ></Places>)
                }
            </Container>
        </Container>
    );
};

export default Home;