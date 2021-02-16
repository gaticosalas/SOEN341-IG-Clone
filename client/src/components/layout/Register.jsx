import React, { Fragment, useState } from 'react'
import axios from 'axios'

const Register = () => {

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

    const register = async e => {
        e.preventDefault();
        
        if (password !== password2) { console.log('Bruh it aint the same') }
        else {

            // //FOR WHEN READY TO SEND TO API ============
            // const newUser = {
            //     name,
            //     email,
            //     password
            // }
            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }

            //     const body = JSON.stringify(newUser)
            //     const res = await axios.post('/api/users', body, config)
            //     console.log(res.data)


            // } catch (err) {
            //     console.error(err.response.data)
            // }

            console.log('NOICEEEEE')
        }
    }

    return (
        <Fragment>
            <section class="container">
                <h1 class="large text-primary">Sign Up</h1>
                <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>
                <form class="form" onSubmit={e => onSubmit(e)}>
                    <div class="form-group">
                        <input
                            type="text"
                            placeholder="Family name"
                            name="last_name"
                            onChange={event => onChange(event)}
                        />
                    </div>
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
                    <div class="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                            onChange={e => onChange(e)}
                            value={password2}
                            required
                        />
                    </div>
                    <input type="submit" class="btn btn-primary" onClick={e => register(e)} value="Register" />
                </form>
                <p class="my-1">
                    Already have an account? <a href="login.html">Sign In</a>
                </p>
            </section>
        </Fragment>
    )
}

export default Register;