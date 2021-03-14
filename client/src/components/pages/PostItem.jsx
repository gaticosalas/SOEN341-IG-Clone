import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../actions/posts';
import Moment from 'react-moment';
import { Link, Redirect } from 'react-router-dom';

import { ReactComponent as Liked } from '../../assets/icons/heart-filled.svg';
import { ReactComponent as Unliked } from '../../assets/icons/heart-bordered.svg';

const PostItem = ({ me, loggedOut, post: { _id, picture, caption, username, avatar, likes, date }, inPostPage, likePost, unlikePost }) => {
    const [liked, setLiked] = useState(false);
    const [likesLength, setLikesLength] = useState(0);

    useEffect(() => {
        setLikesLength(likes.length);
        if(likes.some(user => user.user === me._id))
            setLiked(true);
    }, []); 

    if (loggedOut) {
        return <Redirect to='/' />
    };

    return (
        <Fragment>
            <div className="container" >
                <hr />
                <img style={{ width: '100%' }} src={picture} alt="user post"/>
                <p>{`caption:${caption}`}</p>
                <p>{`likes: ${likesLength}`}</p>
                <span>
                    { liked ?
                        <span style={{cursor: 'pointer'}} onClick={_ => {unlikePost(_id); setLiked(false); setLikesLength(likesLength - 1);}} >
                            <Liked /> 
                        </span>
                        :
                        <span style={{cursor: 'pointer'}} onClick={_ => {likePost(_id); setLiked(true); setLikesLength(likesLength + 1);}}>
                            <Unliked />
                        </span>
                    }
                </span>

                <p>Posted on: <Moment format='YYYY/MM/DD'>{date}</Moment></p>
                <img src={avatar} alt="user pfp"/>
                <p>{`Username:${username}`}</p>
                { !inPostPage ? <Link className="btn" to={`/post/${_id}`}>CLICK TO SEE POST</Link> : null }
            </div>

        </Fragment>
    )
}

const mapStateToProps = state => ({
    loggedOut: state.auth.loggedOut,
    me: state.auth.user,
})

const mapDispatchToProps = {
    likePost,
    unlikePost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
