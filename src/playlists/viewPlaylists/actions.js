import { apiService } from "../../common/services/apiService";

export const REQUEST_PLAYLISTS = 'REQUEST_PLAYLISTS';
export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';
export const REQUEST_DELETE_PLAYLIST = 'REQUEST_DELETE_PLAYLIST';
export const RECEIVE_DELETE_PLAYLIST = 'RECEIVE_DELETE_PLAYLIST';

export const receivePlaylists = playlists => {
    return {
        type: RECEIVE_PLAYLISTS,
        playlists
    };
};

export const requestPlaylists = () => {
    return {
        type: REQUEST_PLAYLISTS,
        fetchConfig: {
            method: 'GET',
            path: apiService.getPlaylists(),
            onSuccess: receivePlaylists
        }
    };
};

export const receiveDeletePlaylist = playlistId => {
    return {
        type: RECEIVE_DELETE_PLAYLIST,
        playlistId
    };
};

export const requestDeletePlaylist = playlistId => {
    return {
        type: REQUEST_DELETE_PLAYLIST,
        fetchConfig: {
            method: 'DELETE',
            path: apiService.deletePlaylist(playlistId),
            onSuccess: () => receiveDeletePlaylist(playlistId)
        }
    };
};
