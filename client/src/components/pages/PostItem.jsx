import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'

const PostItem = ({ isAuthenticated, post: { _id, text, name, avatar, user, likes, comments, date } }) => {
    return (
        <div>post</div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth
})



export default connect(mapStateToProps, {})(PostItem)
