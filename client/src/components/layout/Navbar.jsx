import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, user }) => {

    const location = useLocation();
    const { pathname } = location;

    return (
        <div className="navbarWrapper">
            <div className="logo">
                NAVBAR
            </div>
            <div className="navLinks">
                {user ?
                    <Fragment>
                        {pathname !== '/create-post' ? <Link to='/create-post'><span>NEW POST -</span></Link> : null}
                        {pathname !== `/profile/${user._id}` ? <Link to={`/profile/${user._id}`}><span> MY PROFILE</span></Link> : null}
                        {pathname !== '/feed' ? <Link to='/feed'><span>- FEED</span></Link> : null}

                        <span onClick={logout} style={{ cursor: 'pointer', marginLeft: '10px' }}> - LOGOUT</span>
                    </Fragment>
                    :
                    null}
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
