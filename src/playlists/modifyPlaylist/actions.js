import { apiService } from "../../common/services/apiService";
import { Mode } from "../../common/services/constants";

export const RESET_MODIFY_PLAYLIST = 'RESET_MODIFY_PLAYLIST';
export const ON_SONG_CLICK = 'ON_SONG_CLICK';
export const SORT_SONGS = 'SORT_SONGS';
export const REQUEST_LIBRARY = 'REQUEST_LIBRARY';
export const RECEIVE_LIBRARY = 'RECEIVE_LIBRARY';
export const REQUEST_PLAYLIST_BY_ID = 'REQUEST_PLAYLIST_BY_ID';
export const RECEIVE_PLAYLIST_BY_ID = 'RECEIVE_PLAYLIST_BY_ID';
export const REQUEST_SONG_BY_ID = 'REQUEST_SONG_BY_ID';
export const RECEIVE_SONG_BY_ID = 'RECEIVE_SONG_BY_ID';
export const REQUEST_SAVE_PLAYLIST = 'REQUEST_SAVE_PLAYLIST';
export const RECEIVE_SAVE_PLAYLIST = 'RECEIVE_SAVE_PLAYLIST';

export const resetModifyPlaylist = () => {
    return {
        type: RESET_MODIFY_PLAYLIST
    };
};

export const onSongClick = (checked, songId) => {
    return {
        type: ON_SONG_CLICK,
        checked,
        songId
    };
};

export const sortSongs = sortOn => {
    return {
        type: SORT_SONGS,
        sortOn
    };
};

export const receiveLibrary = songs => {
    return {
        type: RECEIVE_LIBRARY,
        songs
    };
};

export const requestLibrary = () => {
    return {
        type: REQUEST_LIBRARY,
        fetchConfig: {
            method: 'GET',
            path: apiService.getLibrary(),
            onSuccess: receiveLibrary
        }
    };
};

export const receiveSongById = song => {
    return {
        type: RECEIVE_SONG_BY_ID,
        song
    };
};

export const requestSongById = songId => {
    return {
        type: REQUEST_SONG_BY_ID,
        fetchConfig: {
            method: 'GET',
            path: apiService.getSongById(songId),
            onSuccess: receiveSongById
        }
    };
};

export const receivePlaylistById = playlist => {
    return {
        type: RECEIVE_PLAYLIST_BY_ID,
        playlist
    };
};

export const onRequestPlaylistByIdSuccess = (playlist, mode) => dispatch => {
    dispatch(receivePlaylistById(playlist));
    if (mode === Mode.View) {
        // for view mode, get details of playlist's songs
        playlist.songs.forEach(songId => dispatch(requestSongById(songId)));
    }
};

export const requestPlaylistById = (playlistId, mode) => {
    return {
        type: REQUEST_PLAYLIST_BY_ID,
        fetchConfig: {
            method: 'GET',
            path: apiService.getPlaylistById(playlistId),
            onSuccess: playlist => onRequestPlaylistByIdSuccess(playlist, mode)
        }
    };
};

export const receiveSavePlaylist = response => {
    return {
        type: RECEIVE_SAVE_PLAYLIST,
        playlistId: response.id
    };
};

export const requestSavePlaylist = (body, playlistId) => {
    return {
        type: REQUEST_SAVE_PLAYLIST,
        fetchConfig: {
            method: 'POST',
            path: playlistId !== undefined ? apiService.updatePlaylist(playlistId) : apiService.savePlaylist(),
            body,
            onSuccess: receiveSavePlaylist
        }
    };
};
