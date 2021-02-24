import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../../actions/posts'
import Moment from 'react-moment'
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const PostItem = ({ post: { _id, picture, caption, username, avatar, likes, date } }) => {
    console.log({ _id })
    // const [image, setImage] = useState(null);


    return (
        <Fragment>
            <div className="container" >
                <hr />
                <img src={picture} />
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
    isAuthenticated: state.auth,
    // post: state.posts.post,


})

const mapDispatchToProps = {
    fetchPost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
