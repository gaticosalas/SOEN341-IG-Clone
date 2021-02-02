import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { Layout } = this.props;

        return (
            <Layout />
        )
    }
}

export default Navbar;