import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
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

export default function ModifyPlaylist() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const match = useRouteMatch();
    const {
        isSaving,
        playlist,
        songs,
        selectedSongs
    } = useSelector(state => state.modifyPlaylist);

    const playlistNameRef = useRef(null);
    const mode = location.state && location.state.mode ? location.state.mode : Mode.Add;

    useEffect(() => {
        if (mode !== Mode.View) {
            dispatch(requestLibrary());
        }
        if (mode !== Mode.Add) {
            dispatch(requestPlaylistById(match.params.id, mode));
        }
    }, []);

    useEffect(() => {
        return () => {
            dispatch(resetModifyPlaylist());
        }
    }, []);

    useEffect(() => {
        if (isSaving) {
            history.push("/playlists");
        }
    }, [isSaving]);

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(requestSavePlaylist({
            name: mode === Mode.Edit ? playlist.name : playlistNameRef.current.value,
            songs: selectedSongs
        }, playlist.id));
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                {mode !== Mode.Add ?
                    <h3>{playlist.name}</h3>
                    :
                    <>
                        <label>Name of playlist:</label>
                        <input type="text" ref={playlistNameRef} />
                    </>}
                {mode !== Mode.View && <button type="submit" className="btn-submit">Save</button>}
                <table>
                    <thead>
                        <tr>
                            <th className="cursor-none"></th>
                            <th onClick={() => dispatch(sortSongs('title'))}>Title <i className="fa fa-sort"></i></th>
                            <th onClick={() => dispatch(sortSongs('album'))}>Album <i className="fa fa-sort"></i></th>
                            <th onClick={() => dispatch(sortSongs('artist'))}>Artist <i className="fa fa-sort"></i></th>
                            <th onClick={() => dispatch(sortSongs('duration'))}>Duration <i className="fa fa-sort"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song, index) => (<tr key={index}>
                            <td className="chk-centered">
                                {mode !== Mode.View && <input
                                    type="checkbox"
                                    checked={selectedSongs.includes(song.id)}
                                    onChange={event => dispatch(onSongClick(event.target.checked, song.id))}
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
