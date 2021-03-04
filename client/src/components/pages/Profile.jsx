import React, { Fragment, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProfile, followUser, unfollowUser } from '../../actions/profile';
import { fetchUserPosts } from '../../actions/posts';

const Profile = ({ me, fetchUserPosts, fetchProfile, profile, isProfileFetching, arePostsFetching, posts, followUser, unfollowUser }) => {

    let { user_id } = useParams();
    const [isMe, setIsMe] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [followsLength, setFollowsLength] = useState();
    const [followedByLength, setFollowedByLength] = useState();

    useEffect(() => {
        fetchProfile(user_id);
        fetchUserPosts(user_id);

        user_id === me?._id ? setIsMe(true) : setIsMe(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [me, user_id]);


    useEffect(() => {
        if (profile?.followedBy?.some(user => user.user === me._id)) {
            setIsFollowed(true)
        };
        setFollowsLength(profile?.follows?.length);
        setFollowedByLength(profile?.followedBy?.length)
        setLoading(false);
    }, [profile]);



    if (loading || isProfileFetching || arePostsFetching) {
        return <p>Loading...</p>
    }

    if (!isProfileFetching && !loading && !arePostsFetching) {
        const { user, bio } = profile;

        return (
            <Fragment>
                <div className="userInfo">
                    <img src={user?.avatar} alt="user profile avatar" />
                    <div>
                        <p>{`Name: ${user?.first_name} ${user?.last_name}`}</p>
                    </div>
                    <div>
                        <p>{`Username: ${user?.username}`}</p>
                    </div>
                    <div>
                        <p>{`Bio: ${bio}`}</p>
                    </div>
                    <div>
                        <p>{`Follows ${followsLength} people`}</p>
                    </div>
                    <div>
                        <p>{`Followed by ${followedByLength} people`}</p>
                    </div>

                    {isMe ?
                        null
                        :
                        isFollowed ?
                            <button className="btn btn-primary" onClick={async () => {
                                const res = await unfollowUser(user_id);
                                if (res === "success") {
                                    setIsFollowed(false);
                                    setFollowedByLength(followedByLength - 1);
                                }
                            }}>
                                Unfollow
                            </button>
                            :
                            <button className="btn btn-primary" onClick={async () => {
                                const res = await followUser(user_id);
                                if (res === "success") {
                                    setIsFollowed(true);
                                    setFollowedByLength(followedByLength + 1);
                                }
                            }}>
                                Follow
                            </button>
                    }

                    <div className="user-posts">
                        {posts.map((post, key) => {
                            return (
                                <div key={key} >
                                    <img style={{ width: '100%' }} src={post.picture} alt="user post" />
                                    <p>{post.caption}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Fragment >
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    me: state.auth.user,
    profile: state.profile.profile,
    isProfileFetching: state.profile.isFetching,
    arePostsFetching: state.posts.isFetching,
    posts: state.posts.userPosts
});

const mapDispatchToProps = {
    fetchProfile,
    fetchUserPosts,
    followUser,
    unfollowUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);