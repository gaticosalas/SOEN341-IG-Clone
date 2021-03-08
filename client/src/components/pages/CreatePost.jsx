import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost, uploadPicture, deletePicture } from '../../actions/posts';

const CreatePost = ({ loggedOut, createPost, uploadPicture, deletePicture, isFetching }) => {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [imageName, setImageName] = useState('No image selected');
    const hiddenFileInput = React.useRef(null);
    const [postID, setPostID] = useState(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const uploadImg = async img => {
        console.log(img);
        setImageName(img.name);

        let res = await uploadPicture(img);
        setImage(res);
    };

    const deleteImg = async () => {
        await deletePicture(image.imageKey);
        setImage(null);
        setImageName('No image selected');
    };

    const onSubmit = async e => {

        e.preventDefault();
        const formData = {
            picture: image.imageUrl,
            caption
        }
        const res = await createPost(formData);
        if (res.post) {
            console.log(res.post._id);
            setPostID(res.post._id);
        }
    };

    if (postID) {
        return <Redirect to={`/post/${postID}`} />
    };

    if (loggedOut) {
        return <Redirect to='/' />
    };

    return (
        <Fragment>
            <div className="createPostWrapper">
                <form className="form" onSubmit={e => onSubmit(e)}>

                    <div className="form-group">
                        <label htmlFor="picture">Choose your image (.png and .jpeg formats only)</label>
                        <input
                            type="file"
                            ref={hiddenFileInput}
                            name="picture"
                            accept="image/x-png,image/jpeg"
                            style={{ display: 'none' }}
                            onChange={e => uploadImg(e.target.files[0])}
                        />
                        <div className="falseinputWrapper">
                            <button type="button" className="btn btn-primary" onClick={handleClick} >Select</button>
                            <p id="selected_filename" className="ml-3">{imageName}</p>
                        </div>
                    </div>

                    {isFetching ?
                        <div>LOADING...</div>
                        :
                        null}

                    {image ?
                        <div className="imageWrapper">
                            <img style={{ width: '100%' }} src={image.imageUrl} alt={imageName} />
                            <p onClick={deleteImg}>DELETE PICTURE</p>
                        </div>
                        :
                        null}

                    <div className="form-group">
                        <label htmlFor="caption">Caption your post</label>
                        <div className="row">
                            <input
                                type="text"
                                name="caption"
                                // minLength="6"
                                onChange={e => setCaption(e.target.value)}
                            />
                        </div>
                    </div>

                    <input type="submit" className="btn btn-primary" value="CreatePost" />
                </form >
            </div>
        </Fragment>
    )
}


const mapStateToProps = state => ({
    loggedOut: state.auth.loggedOut,
    isFetching: state.posts.isFetching
});

const mapDispatchToProps = {
    createPost,
    uploadPicture,
    deletePicture
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
