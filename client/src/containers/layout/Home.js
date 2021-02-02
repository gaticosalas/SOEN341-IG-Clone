import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { Layout, title } = this.props;

        return (
            <Layout 
                title={title}
            />
        )
    }
}

export default Home;