import React, { Fragment, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProfile, followUser, unfollowUser } from '../../actions/profile';


const Profile = ({ isAuthenticated, me, fetchProfile, profile, isFetching, followUser, unfollowUser }) => {
    // grabs route parameter (user_id) from '/profile/:user_id'
    let { user_id } = useParams();
    const [isMe, setIsMe] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [followsLength, setFollowsLength] = useState();
    const [followedByLength, setFollowedByLength] = useState();

    // useEffect with a [] as its second parameter executes the content
    // of the first function only once, when the component is mounted (first loaded).
    useEffect(() => {
        fetchProfile(user_id);
        //IDs match so isMe is set as true, false if they don't
        user_id === me?._id ? setIsMe(true) : setIsMe(false);
        console.log(isMe);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [me]);

    useEffect(() => {
        //checking to see if 'me' is already following (in the followedBy array) the user who's profile we're checking out
        if (profile?.followedBy?.some(user => user.user === me._id)) {
            setIsFollowed(true)
        };
        setFollowsLength(profile?.follows.length);
        setFollowedByLength(profile?.followedBy.length)
        setLoading(false);
    }, [profile])

    // If user is not authenticated, redirected to login page (home)
    // if (!isAuthenticated) {
    //     return <Redirect to='/' />
    // }

    // We will make a loading component later
    if (isFetching || loading) {
        return <p>Loading...</p>
    }
    
    if(!isFetching && !loading) {
        // Grabbing all the values from the main objects.
        // Uncomment the following console.log to see the values of the profile object.
        //console.log(profile);
        const { bio, user, follows, followedBy } = profile;
        const { first_name, last_name, username, avatar } = user;
        
        return (
            <Fragment>
                <div className="userInfo">
                    <img src={avatar} alt="user profile avatar"/>
                    <div>
                        <p>{`Name: ${first_name} ${last_name}`}</p>
                    </div>
                    <div>
                        <p>{`Username: ${username}`}</p>
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
                    
                    {isMe?
                    //checking to see if a user is NOT on their own profile page, and if they are following/not following the profile they're checking out
                    //the type & value should change depending on whether or not they are following/notfollowing the profile in question
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
                            <button className="btn btn-primary" onClick={async ()=> {
                                const res = await followUser(user_id); 
                                if (res === "success") {
                                    setIsFollowed(true);
                                    setFollowedByLength(followedByLength + 1);
                                }
                            }}>
                                Follow
                            </button>
                    }
                     
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    me: state.auth.user,
    profile: state.profile.profile,
    isFetching: state.profile.isFetching
});

const mapDispatchToProps = {
    fetchProfile,
    followUser,
    unfollowUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);