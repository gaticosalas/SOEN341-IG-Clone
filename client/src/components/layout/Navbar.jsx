import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, user }) => {
    return (
        <div>
            NAVBAR
            { user ? <span onClick={logout} style={{ cursor: 'pointer', marginLeft: '10px'}}>LOGOUT</span> : null}
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
