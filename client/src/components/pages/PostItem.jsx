import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../actions/posts';
import Moment from 'react-moment';
import { Link, Redirect } from 'react-router-dom';

import { ReactComponent as Liked } from '../../assets/icons/heart-filled.svg';
import { ReactComponent as Unliked } from '../../assets/icons/heart-bordered.svg';
import '../../styles/pages/postItem.css';

const PostItem = ({ me, loggedOut, post: { _id, user, picture, caption, username, avatar, likes, date }, likePost, unlikePost }) => {
    const [liked, setLiked] = useState(false);
    const [likesLength, setLikesLength] = useState(likes.length);
    const [heartClassName, setHeartClassName] = useState('');

    useEffect(() => {
        setLikesLength(likes.length);
        if(likes.some(user => user.user === me._id))
            setLiked(true);
        else
            setLiked(false);
    }, [likes]); 

    const startStopAnimation = () => {    
        setHeartClassName("heart-animation");
    };

    const onAnimationEnd = () => {
        setHeartClassName("");
    };

    if (loggedOut) {
        return <Redirect to='/' />
    };

    return (
        <Fragment>
            <div className="post-item" >
                <div className="post-header">
                    <Link to={`/profile/${user}`}><img src={avatar} alt="user pfp"/></Link>
                    <Link to={`/profile/${user}`}><p className="mb-0"><b>{username}</b></p></Link>
                </div>

                <Link to={`/post/${_id}`}><img style={{ width: '100%' }} src={picture} alt="user post"/></Link>
                

                <div className="post-content">
                    <div className="interactive-section">
                        { liked ?
                            <span style={{cursor: 'pointer'}} onAnimationEnd={onAnimationEnd}
                            onClick={_ => {
                                unlikePost(_id); 
                                setLiked(false); 
                                setLikesLength(likesLength - 1); 
                                startStopAnimation();
                            }}>
                                <Liked className={heartClassName}/> 
                            </span>
                            :
                            <span style={{cursor: 'pointer'}} onAnimationEnd={onAnimationEnd}
                            onClick={_ => {
                                likePost(_id); setLiked(true); 
                                setLikesLength(likesLength + 1); 
                                startStopAnimation();
                            }}>
                                <Unliked className={heartClassName}/>
                            </span>
                        }
                    </div>
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
