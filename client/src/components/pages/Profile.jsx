import React, { Fragment, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profile';
import { fetchUserPosts } from '../../actions/posts'


const Profile = ({ isAuthenticated, me, fetchUserPosts, fetchProfile, profile, isProfileFetching, arePostsFetching, posts }) => {
    // grabs route parameter (user_id) from '/profile/:user_id'
    let { user_id } = useParams();
    const [loading, setLoading] = useState(true);
    // useEffect with a [] as its second parameter executes the content
    // of the first function only once, when the component is mounted (first loaded).
    useEffect(() => {
        fetchProfile(user_id);
        fetchUserPosts(user_id);
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // If user is not authenticated, redirected to login page (home)
    if (!isAuthenticated) {
        return <Redirect to='/' />
    }

    // We will make a loading component later
    if (loading || isProfileFetching || arePostsFetching) {
        return <p>Loading...</p>
    }

    if (!isProfileFetching && !loading && !arePostsFetching) {
        // Grabbing all the values from the main objects.
        // Uncomment the following console.log to see the values of the profile object.
        //console.log(profile);
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
                    <div className="user-posts">
                        {posts.map((post, key) => {
                            return (
                                <div key={key} >
                                    <img src={post.picture} alt="user post" />
                                    <p>{post.caption}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Fragment >
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    me: state.auth.user,
    profile: state.profile.profile,
    isProfileFetching: state.profile.isFetching,
    arePostsFetching: state.posts.isFetching,
    posts: state.posts.userPosts
});

const mapDispatchToProps = {
    fetchProfile,
    fetchUserPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);