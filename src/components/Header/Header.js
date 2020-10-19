import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="d-flex justify-content-around navbar">
            <img src="https://i.ibb.co/Hg2bhq0/Logo-White.png" alt="Logo" />
            <input className="form-control col-md-2" type="text" placeholder="Search Your Destination" />
            <Link className="text-reset text-decoration-none" to="/home"><h6 className="nav-items">Home</h6></Link>
            {/* <h6>News</h6> */}
            <h6 className="nav-items">Destination</h6>
            <h6 className="nav-items">Blog</h6>
            <h6 className="nav-items">Contact</h6>
            {loggedInUser.email ? <h6 className="nav-user-login">{loggedInUser.email}</h6> :
                <Link className="login-link" to="/login"><h6 className="nav-user-login">Login</h6></Link>}


        </div>



















        // <Navbar variant="light">
        //     <Navbar.Brand href="#home"><div >
        //         <img src="https://i.ibb.co/Y3RxkVY/Logo-White.png" alt="Logo" className="logo" fluid />
        //     </div></Navbar.Brand>

        //     <Form inline>
        //         <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        //         <Button variant="outline-primary">Search</Button>
        //     </Form>

        //     <Nav className="navLinks ml-auto">

        //         <Nav.Link className="navLink" href="/home">Home</Nav.Link>


        //         <Nav.Link className="navLink" href="/login" eventKey="link-1">Sign In</Nav.Link>


        //         <Nav.Link className="navLink" href="/signup" eventKey="link-2">Sign Up</Nav.Link>


        //         <Nav.Link className="navLink" href="/booking" >Booking</Nav.Link>


        //         <button className="btn btn-danger mr-auto loginBtn">Login</button>
        //     </Nav>

        // </Navbar>
    );
};

export default Header;