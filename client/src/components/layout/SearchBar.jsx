import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { searchUsers } from '../../actions/profile';

import { Modal, Button } from 'reactstrap';

const SearchBar = ( {searchUsers, result} ) => {
    const [ input, setInput ] = useState("")
    function handleclick(e){
        e.preventDefault()
        searchUsers(input)
    }

    useEffect(() => {
        console.log(result)
    }, [result]);

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            <div className="search-bar-wrapper">
                <form>
                    <input type="text" name="user-search" placeholder="Find users..." onChange={e => setInput(e.target.value)}></input>
                    <button onClick={(e)=>{
                        handleclick(e);
                        handleShow()
                        }}>Search!</button>
                </form>
            </div>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </Fragment>
        
    )
}


const mapStateToProps = state => ({
    result: state.profile.searchResults
});

const mapDispatchToProps = {
    searchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
