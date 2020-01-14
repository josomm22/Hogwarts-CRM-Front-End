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
                    <NavLink exact={true} activeClassName="is-Active" to="/students"> Home </NavLink>
                </div>
                <div className='button'>
                    <NavLink exact={true} activeClassName="is-Active" to="/studentdetails/1001"> Student Details </NavLink>
                </div>
                <div className='button'>
                    <NavLink activeClassName="is-Active" to="/newstudent">
                        New Student
                    </NavLink>
                </div>
                <div className='button'>
                    <NavLink activeClassName="is-Active" to="/summary">
                        Summary
                    </NavLink>
                </div>

            </div>
        </nav>
    )
}
export default Navbar;