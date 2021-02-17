import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alerts';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated, isUserLoaded, user }) => {

    const [formData, setFormData] = useState({
        last_name: '',
        first_name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
    })

    const { last_name, first_name, username, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();

        if (password !== password2) {
            setAlert('Passwords do not match!', 'danger');
        }
        else {
            await register({ first_name, last_name, username, email, password});
        }
    }

    if (isAuthenticated && isUserLoaded) {
        // Once user is registered and his information has been loaded to redux,
        // he will be redirected to his profile
        return <Redirect to={`/profile/${user._id}`} />
    }


    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)} >
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Last name"
                            name="last_name"
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="First name"
                            name="first_name"
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="username"
                            name="username"
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            onChange={e => onChange(e)}
                        />

                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/">Sign In</Link>
                </p>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isUserLoaded: state.auth.isUserLoaded,
    user: state.auth.user
});

const mapDispatchToProps = {
    register,
    setAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);