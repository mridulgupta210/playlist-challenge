import React, { Component } from 'react';
import './header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                Playlists Challenge <i className="fa fa-music"></i>
            </header>
        );
    }
}
