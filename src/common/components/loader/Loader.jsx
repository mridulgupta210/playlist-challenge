import React, { Component } from 'react';
import { connect } from 'react-redux';
import './loader.css';

class Loader extends Component {
    render() {
        const loaderVisiblity = this.props.showLoader ? 'loader' : 'loader d-none';
        return (
            <div className={loaderVisiblity} id="loader">
                <div className="loader-box">
                    <p>One Moment...</p>
                    <div className="loader-box-image" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showLoader: state.loader.showLoader
});

export default connect(mapStateToProps)(Loader);
