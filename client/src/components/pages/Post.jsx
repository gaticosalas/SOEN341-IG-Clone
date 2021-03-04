import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchPost } from '../../actions/posts'
import Moment from 'react-moment'
import 'bootstrap/dist/css/bootstrap.min.css';

const Post = ({ isAuthenticated, post: { user, username, picture, caption, avatar, likes, date }, fetchPost, isFetching }) => {

    let { post_id } = useParams()
    useEffect(() => {
        fetchPost(post_id)
    }, []);

    console.log(post_id)
    console.log("profile:", user)



    // if (!isAuthenticated) {
    //     return <Redirect to='/' />
    // }



    return isFetching ? <Fragment><h1>loading</h1></Fragment>
        :
        <Fragment>
            <div className="container" >
                <hr />
                <img style={{ width: '100%' }} src={picture} />
                <p>{`caption:${caption}`}</p>
                <p>Posted on: <Moment format='YYYY/MM/DD'>{date}</Moment></p>
                <img src={avatar} />
                <p>{`Username:${username}`}</p>
                {/* for some reason sometimes it works, sometimes it doesn't */}
                {/* <span>{`likes: ${likes.length}`}</span> */}

            </div>


        </Fragment>



}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    post: state.posts.post,
    isFetching: state.posts.post.isFetching,
    user: state.auth.user,

});

const mapDispatchToProps = {
    fetchPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)

//post_id sample: 6033dec395b05f40205f4c30
