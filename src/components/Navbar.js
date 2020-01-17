import React from 'react';
import {
    BrowserRouter as Router,
    NavLink,
} from "react-router-dom";


const Navbar = () => {
    return (
        <nav className='navBar'>
            <div className='centerNav'>
                <NavLink exact={true} activeClassName="is-Active" to="/students">
                    <div className='navButton'>
                        <h4>
                            Home
                        </h4>
                    </div>
                </NavLink>
                <NavLink exact={true} activeClassName="is-Active" to="/studentdetails/1001">
                    <div className='navButton'>
                        <h4>
                            Student Details
                        </h4>
                    </div>
                </NavLink>
                <NavLink activeClassName="is-Active" to="/newstudent">
                    <div className='navButton'>
                        <h4>
                            New Student
                        </h4>
                    </div>
                </NavLink>
                <NavLink activeClassName="is-Active" to="/summary">
                    <div className='navButton'>
                        <h4>
                            Summary
                        </h4>
                    </div>
                </NavLink>

            </div>
        </nav>
    )
}
export default Navbar;