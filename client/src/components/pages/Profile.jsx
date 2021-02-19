import React, { Fragment, useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
// import { setAlert } from '../../actions/alerts';
import { fetchProfile } from '../../actions/profile';

const Profile = ({ isAuthenticated, me, fetchProfile, profile, isFetching }) => {
    // grabs route parameter (user_id) from '/profile/:user_id'
    let { user_id } = useParams();

    // useEffect with a [] as its second parameter executes the content
    // of the first function only once, when the component is mounted (first loaded).
    useEffect(() => {
        fetchProfile(user_id);
    }, []);

    const [post, setPost] = useState({
        caption: "aijdasd",
        image: "aojdoajsd"
    });

    // If user is not authenticated, redirected to login page (home)
    if (!isAuthenticated) {
        return <Redirect to='/' />
    }

    // We will make a loading component later
    if (isFetching) {
        return <p>Loading...</p>
    }

    // Grabbing all the values from the main objects.
    // Uncomment the following console.log to see the values of the profile object.
    console.log(profile);
    const { bio, user, follows, followedBy } = profile;
    const { first_name, last_name, username, avatar } = user;
    
    if(!isFetching) {
        return (
            <Fragment>
                <div className="userInfo">
                    <img src={avatar} alt="user profile avatar"/>
                    <div>
                        <p>{`Name: ${first_name} ${last_name}`}</p>
                    </div>
                    <div>
                        <p>{`Username: ${username}`}</p>
                    </div>
                    <div>
                        <p>{`Bio: ${bio}`}</p>
                    </div>
                    <div>
                        <p>{`Follows ${follows.length} people`}</p>
                    </div>
                    <div>
                        <p>{`Followed by ${followedBy.length} people`}</p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    me: state.auth.user,
    profile: state.profile.profile,
    isFetching: state.profile.isFetching
});

const mapDispatchToProps = {
    fetchProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);