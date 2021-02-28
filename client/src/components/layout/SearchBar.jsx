import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { searchUsers } from '../../actions/profile';
import { Link } from 'react-router-dom'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const SearchBar = ( {searchUsers, result} ) => {
    const [ input, setInput ] = useState("")
    function handleclick(e){
        e.preventDefault()
        searchUsers(input)
    }

    const handleChange = async (e) => {
        const value = e.target.value
        setInput(value)
        searchUsers(input);
        };

    useEffect(() => {
        
    }, [result]);

    console.log(result)

    let users = ("users" in result) ? result["users"] : null;

    console.log(`users: ${users}`)



    return (
        <Fragment>
            <div className="search-bar-wrapper">
                <form autoComplete="off">
                    <input type="text" name="user-search" placeholder="Find users..." onChange={e => handleChange(e)}></input>
                </form>
            </div>
            { users && input ?
                <Fragment>
                    <ul className="user-list">
                        {users.map((user, idx) => 
                            <Link to={`/profile/${user._id}`}><li className={`user-item`} key={idx}>
                                {user._id}
                            </li>
                            </Link>
                        )}
                        
                    </ul>
                    <div>esse</div>
                </Fragment>
                : null
            }
            
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
