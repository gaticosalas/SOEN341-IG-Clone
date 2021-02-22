import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { fetchAllPosts } from '../../actions/posts'
import PostItem from './PostItem.jsx'



const Posts = ({ isAuthenticated, fetchAllPosts, post: { posts, isFetching } }) => {
    useEffect(() => {
        fetchAllPosts()
    }, [fetchAllPosts])
    // return <h1>hello</h1>
    return isFetching ? <Fragment><h1>loading</h1></Fragment> :
        <Fragment>
            <h1 className="large text-primary"></h1>
            <p className='lead'>
                <i className='fas fa-user' /> Posts:
            </p>
            {/* PostForm */}
            <div className='posts'>
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}

            </div>

        </Fragment>

}
// Posts.propTypes = {
//     fetchAllPosts: PropTypes.func.isRequired,
//     post: PropTypes.object.isRequired
// }

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    post: state.posts,
    isFetching: state.posts.isFetching,
})




const mapDispatchToProps = {
    fetchAllPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);