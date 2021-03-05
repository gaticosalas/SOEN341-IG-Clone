import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts } from '../../actions/posts'
import PostItem from './PostItem.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';



//The feed will only show posts of followed users only*
const FollowedPosts = ({ isAuthenticated, me, profile, fetchAllPosts, post: { posts }, isFetching }) => {
    useEffect(() => {
        fetchAllPosts()
    }, [fetchAllPosts])
    // console.log("posts: ", posts)
    // console.log("me: ", me)
    // console.log("following:", profile.follows)
    const filteredPosts = posts.filter((p) => (profile.follows.map((f) => (f.user)).includes(p.user)))
    // console.log("filtered posts: ", filteredPosts)

    return isFetching ? <Fragment><h1>loading</h1></Fragment> :
        <Fragment>
            <h1 className="large text-primary"></h1>
            <p className="lead">
                <i className="fas fa-user" /> Posts:
            </p>

            <div >
                { }
                {filteredPosts.map((post) => (
                    // console.log(JSON.stringify(post))
                    < PostItem key={post} post={post} />
                ))}

            </div>

        </Fragment>

}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    me: state.auth.user,
    post: state.posts,
    isFetching: state.posts.isFetching,
    profile: state.profile.profile,
})




const mapDispatchToProps = {
    fetchAllPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowedPosts);