import { RECEIVE_PLAYLISTS, REQUEST_PLAYLISTS, RECEIVE_DELETE_PLAYLIST } from "./actions";

const viewPlaylistsInitialState = {
    playlists: []
};

export const viewPlaylists = (state = viewPlaylistsInitialState, action) => {
    switch (action.type) {
        case REQUEST_PLAYLISTS:
            return Object.assign({}, state, {
                playlists: []
            });
        case RECEIVE_PLAYLISTS:
            return Object.assign({}, state, {
                playlists: action.playlists
            });
        case RECEIVE_DELETE_PLAYLIST:
            return Object.assign({}, state, {
                playlists: state.playlists.filter(x => x.id !== action.playlistId)
            });
        default:
            return state;
    }
};
