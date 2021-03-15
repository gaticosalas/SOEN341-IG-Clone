import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchFollowedUsersPosts } from '../../actions/posts'
import PostItem from './PostItem.jsx'
import { Redirect } from 'react-router-dom';



//The feed will only show posts of followed users only*
const FollowedPosts = ({ loggedOut, me, fetchFollowedUsersPosts, post: { posts }, isFetching }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(me?._id) {
            fetchFollowedUsersPosts(me._id);
            setLoading(false);
        }
    }, [me]);

    if (loggedOut) {
        return <Redirect to='/' />
    };

    return isFetching || loading ? <Fragment><h1>loading</h1></Fragment> :
        <Fragment>
            <div >
                {posts.map((post, key) => (
                    <div className="mb-5" key={key}>
                        <PostItem post={post} />
                    </div>
                ))}

            </div>
        </Fragment>

}


const mapStateToProps = state => ({
    loggedOut: state.auth.loggedOut,
    me: state.auth.user,
    post: state.posts,
    isFetching: state.posts.isFetching,
    profile: state.profile.profile,
})




const mapDispatchToProps = {
    fetchFollowedUsersPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowedPosts);