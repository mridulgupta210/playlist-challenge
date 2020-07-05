import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './header/header.jsx';
import ViewPlaylists from './playlists/viewPlaylists/viewPlaylists.jsx';
import ModifyPlaylist from './playlists/modifyPlaylist/modifyPlaylist';
import Loader from './common/components/loader/Loader';

export default class App extends Component {
  render() {
    return (
      <>
        <Loader />
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/playlists" component={ViewPlaylists} />
            <Route path="/playlist/:id?" component={ModifyPlaylist} />
            <Redirect exact from="/" to="/playlists" />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}
