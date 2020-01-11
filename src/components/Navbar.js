import React from 'react';
import {
    BrowserRouter as Router,
    NavLink,
} from "react-router-dom";


const Navbar = () => {
    return (
        <nav className='navBar'>
            <div className='centerNav'>
                <div className='button'>
                    <NavLink exact={true} activeClassName="is-Active" to="/"> Home </NavLink>
                </div>
                <div className='button'>
                    <NavLink activeClassName="is-Active" to="/newStudent">
                        New Student
                    </NavLink>
                </div>
                
            </div>
        </nav>
    )
}
export default Navbar;