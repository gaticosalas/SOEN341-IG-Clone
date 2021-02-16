import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { name, email, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        console.log('NOICEEEEE')

    }

    return (
        <Fragment>
            <section class="container">
                <h1 class="large text-primary">Sign In</h1>
                <p class="lead"><i class="fas fa-user"></i> Sign Into Your Account</p>
                <form class="form" onSubmit={e => onSubmit(e)}>
                    <div class="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            onChange={e => onChange(e)}
                            value={email}
                            required
                        />

                    </div>
                    <div class="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            onChange={e => onChange(e)}
                            value={password}
                            required
                        />
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                    <p class="my-1">
                        Don't have an account? <Link to="/register">Sign Up!</Link>
                    </p>
                </form >

            </section >
        </Fragment >
    )
}

export default Login; 