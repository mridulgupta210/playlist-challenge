import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './viewPlaylists.css';
import { requestPlaylists, requestDeletePlaylist } from './actions';
import { Mode } from '../../common/services/constants';
import PlaylistCard from '../playlistCard/playlistCard.jsx';

export default function ViewPlaylists() {
    const dispatch = useDispatch();
    const history = useHistory();

    const playlists = useSelector(state => state.viewPlaylists.playlists);

    useEffect(() => {
        dispatch(requestPlaylists());
    }, []);

    const navigateToPlaylist = (mode, playlistId) => {
        history.push({
            pathname: `playlist${playlistId !== undefined ? `/${playlistId}` : ""}`,
            state: { mode }
        });
    }

    const onDelete = (event, playlistId) => {
        event.stopPropagation();
        dispatch(requestDeletePlaylist(playlistId));
    }

    const onEdit = (event, playlistId) => {
        event.stopPropagation();
        navigateToPlaylist(Mode.Edit, playlistId);
    }

    return (
        <div>
            {playlists.length === 0 ?
                <section className="no-playlist">
                    You have no playlist as of now
                        <button className="btn btn-warning" onClick={() => navigateToPlaylist(Mode.Add)}>
                        Click here to add playlist
                        </button>
                </section>
                :
                <>
                    <section>
                        <button className="btn btn-warning add-btn" onClick={() => navigateToPlaylist(Mode.Add)}>
                            Add Playlist
                            </button>
                    </section>

                    <section className="cards">
                        {playlists.map(playlist => (
                            <PlaylistCard
                                key={playlist.id}
                                playlist={playlist}
                                onCardClick={playlistId => navigateToPlaylist(Mode.View, playlistId)}
                                onEditClick={onEdit}
                                onDeleteClick={onDelete} />
                        ))}
                    </section>
                </>}
        </div >
    );
}
