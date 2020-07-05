import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './modifyPlaylist.css';
import { Mode } from '../../common/services/constants';
import {
    requestLibrary,
    requestPlaylistById,
    requestSavePlaylist,
    resetModifyPlaylist,
    onSongClick,
    sortSongs
} from './actions';

class ModifyPlaylist extends Component {
    constructor(props) {
        super(props);

        this.mode = Mode.Add;
        this.playlistNameRef = createRef();
    }

    handleSubmit = event => {
        const { playlist, selectedSongs, actions } = this.props;

        event.preventDefault();
        actions.requestSavePlaylist({
            name: this.mode === Mode.Edit ? playlist.name : this.playlistNameRef.current.value,
            songs: selectedSongs
        }, playlist.id);
    }

    render() {
        const { playlist, songs, actions, selectedSongs } = this.props;

        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    {this.mode !== Mode.Add ?
                        <h3>{playlist.name}</h3>
                        :
                        <>
                            <label>Name of playlist:</label>
                            <input type="text" ref={this.playlistNameRef} />
                        </>}
                    {this.mode !== Mode.View && <button type="submit" className="btn-submit">Save</button>}
                    <table>
                        <thead>
                            <tr>
                                <th className="cursor-none"></th>
                                <th onClick={() => actions.sortSongs('title')}>Title <i className="fa fa-sort"></i></th>
                                <th onClick={() => actions.sortSongs('album')}>Album <i className="fa fa-sort"></i></th>
                                <th onClick={() => actions.sortSongs('artist')}>Artist <i className="fa fa-sort"></i></th>
                                <th onClick={() => actions.sortSongs('duration')}>Duration <i className="fa fa-sort"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.map((song, index) => (<tr key={index}>
                                <td className="chk-centered">
                                    {this.mode !== Mode.View && <input
                                        type="checkbox"
                                        checked={selectedSongs.includes(song.id)}
                                        onChange={event => actions.onSongClick(event.target.checked, song.id)}
                                    />}
                                </td>
                                <td>{song.title}</td>
                                <td>{song.album}</td>
                                <td>{song.artist}</td>
                                <td>{song.duration}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </form>
            </section>
        );
    }

    componentDidUpdate(prevProps) {
        const { isSaving, history } = this.props;

        if (prevProps.isSaving !== isSaving && isSaving) {
            history.push("/playlists");
        }
    }

    componentDidMount() {
        const { match, location, actions } = this.props;
        this.mode = location.state && location.state.mode ? location.state.mode : Mode.Add;

        actions.requestLibrary();

        if (this.mode !== Mode.Add) {
            actions.requestPlaylistById(match.params.id, this.mode);
        }
    }

    componentWillUnmount() {
        this.props.actions.resetModifyPlaylist();
    }
}

const mapStateToProps = state => ({
    ...state.modifyPlaylist
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        requestLibrary,
        requestPlaylistById,
        requestSavePlaylist,
        resetModifyPlaylist,
        onSongClick,
        sortSongs
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyPlaylist);
