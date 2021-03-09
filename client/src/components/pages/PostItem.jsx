import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions/posts';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';


const PostItem = ({ post: { _id, picture, caption, username, avatar, likes, date } }) => {

    return (
        <Fragment>
            <div className="container" >
                <hr />
                <img style={{ width: '100%' }} src={picture} />
                <p>{`caption:${caption}`}</p>
                <p>Posted on: <Moment format='YYYY/MM/DD'>{date}</Moment></p>
                <img src={avatar} />
                <p>{`Username:${username}`}</p>
                <span>{`likes: ${likes.length}`}</span>
                <Link className="btn" to={`/post/${_id}`}>CLICK TO SEE POST</Link>


            </div>

        </Fragment>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    fetchPost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
