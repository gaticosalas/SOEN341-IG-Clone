import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions/posts';
import { Redirect } from 'react-router-dom';
import PostItem from './PostItem';

const Post = ({ loggedOut, user, post, fetchPost, isFetching }) => {

    const [loading, setLoading] = useState(true);

    let { post_id } = useParams();
    useEffect(() => {
        fetchPost(post_id);
    }, [post_id]);

    useEffect(() => {
        if(post && post.likes)
            setLoading(false);
    }, [post]);

    if (loggedOut) {
        return <Redirect to='/' />
    };

    return ( isFetching || loading || !user ) ? 
    
        <Fragment><h1>loading</h1></Fragment>
        :
        <Fragment>
            <PostItem post={post} inPostPage={true} />


        </Fragment>



}
const mapStateToProps = state => ({
    loggedOut: state.auth.loggedOut,
    post: state.posts.post,
    isFetching: state.posts.post.isFetching,
    user: state.auth.user,

});

const mapDispatchToProps = {
    fetchPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)

//post_id sample: 6033dec395b05f40205f4c30
