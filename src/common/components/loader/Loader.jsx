import React from 'react';
import { useSelector } from 'react-redux';
import './loader.css';

export default function Loader() {
    const showLoader = useSelector(state => state.loader.showLoader);
    const loaderVisiblity = showLoader ? 'loader' : 'loader d-none';

    return (
        <div className={loaderVisiblity} id="loader">
            <div className="loader-box">
                <p>One Moment...</p>
                <div className="loader-box-image" />
            </div>
        </div>
    );
}
