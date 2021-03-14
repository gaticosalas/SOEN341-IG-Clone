import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../actions/posts';
import Moment from 'react-moment';
import { Link, Redirect } from 'react-router-dom';

import { ReactComponent as Liked } from '../../assets/icons/heart-filled.svg';
import { ReactComponent as Unliked } from '../../assets/icons/heart-bordered.svg';
import '../../styles/pages/postItem.css';

const PostItem = ({ me, loggedOut, post: { _id, picture, caption, username, avatar, likes, date }, likePost, unlikePost }) => {
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
            <div className="post-item" >
                <div className="post-header">
                    <img src={avatar} alt="user pfp"/>
                    <p className="mb-0"><b>{username}</b></p>
                </div>

                <Link className="btn" to={`/post/${_id}`}><img style={{ width: '100%' }} src={picture} alt="user post"/></Link>
                

                <div className="post-content">
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
                    <p><b>{ (likesLength > 1 || likesLength === 0) ? `${likesLength} likes` : `${likesLength} like`}</b></p>
                    <p><b>{username}</b> {caption}</p>
                    <p className="time-posted"><Moment fromNow>{date}</Moment></p>
                </div>
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
