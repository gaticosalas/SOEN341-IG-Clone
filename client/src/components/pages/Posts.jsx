import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts } from '../../actions/posts'
import PostItem from './PostItem.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';



//The feed will only show posts of followed users only*
const Posts = ({ fetchAllPosts, post: { posts }, isFetching }) => {
    useEffect(() => {
        fetchAllPosts()
    }, [fetchAllPosts])


    return isFetching ? <Fragment><h1>loading</h1></Fragment> :
        <Fragment>
            <h1 className="large text-primary"></h1>
            <p className="lead">
                <i className="fas fa-user" /> Posts:
            </p>

            <div >
                {posts.map((post) => (
                    // console.log(JSON.stringify(post))
                    < PostItem key={post} post={post} />
                ))}

            </div>

        </Fragment>

}


const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    post: state.posts,
    isFetching: state.posts.isFetching,
})




const mapDispatchToProps = {
    fetchAllPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);