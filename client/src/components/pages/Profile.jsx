import React, { Fragment, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profile';


const Profile = ({ isAuthenticated, me, fetchProfile, profile, isProfileFetching }) => {
    // grabs route parameter (user_id) from '/profile/:user_id'
    let { user_id } = useParams();
    const [loading, setLoading] = useState(true);
    // useEffect with a [] as its second parameter executes the content
    // of the first function only once, when the component is mounted (first loaded).
    useEffect(() => {
        fetchProfile(user_id);

        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // If user is not authenticated, redirected to login page (home)
    if (!isAuthenticated) {
        return <Redirect to='/' />
    }

    // We will make a loading component later
    if (loading || isProfileFetching) {
        return <p>Loading...</p>
    }

    if (!isProfileFetching && !loading) {
        // Grabbing all the values from the main objects.
        // Uncomment the following console.log to see the values of the profile object.
        console.log(profile);
        const { user, bio, follows, followedBy } = profile;


        return (
            <Fragment>
                <div className="userInfo">
                    <img src={user?.avatar} alt="user profile avatar" />
                    <div>
                        <p>{`Name: ${user?.first_name} ${user?.last_name}`}</p>
                    </div>
                    <div>
                        <p>{`Username: ${user?.username}`}</p>
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
    isProfileFetching: state.profile.isFetching,
});

const mapDispatchToProps = {
    fetchProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);