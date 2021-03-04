import React, { Fragment, useEffect, useState } from 'react'
import { fetchUserPosts } from '../../actions/posts';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profile';


function FollowedPosts({ isAuthenticated, user, profile, fetchUserPosts, userPosts, fetchProfile, isProfileFetching, arePostsFetching, posts }) {
    // console.log(user)
    useEffect(() => {
        // fetchProfile(profile.follows[0]);
        // fetchUserPosts(profile.follows)

    }, []);
    // console.log(profile.follows[0].user)
    // let ami = profile.follows[0].user
    // console.log(userPosts.ami)

    return arePostsFetching ? <Fragment><h1>loading</h1></Fragment> :
        <Fragment>
            <h1 className="large text-primary"></h1>
            <p className="lead">
                <i className="fas fa-user" /> Followed Posts:
            </p>

            <div >
                {/* {posts.map((post) => (
                    // console.log(JSON.stringify(post))
                    < PostItem key={post} post={post} />
                ))} */}
                poopface

            </div>

        </Fragment>

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    // user: state.auth.user,
    isProfileFetching: state.profile.isFetching,
    profile: state.profile.profile,
    arePostsFetching: state.posts.isFetching,
    userPosts: state.posts.userPosts
});

const mapDispatchToProps = {
    fetchUserPosts,
    fetchProfile

}

export default connect(mapStateToProps, mapDispatchToProps)(FollowedPosts);