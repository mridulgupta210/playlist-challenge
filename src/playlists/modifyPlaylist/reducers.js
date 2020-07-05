import {
    RECEIVE_LIBRARY,
    RECEIVE_PLAYLIST_BY_ID,
    RECEIVE_SONG_BY_ID,
    RECEIVE_SAVE_PLAYLIST,
    RESET_MODIFY_PLAYLIST,
    ON_SONG_CLICK,
    SORT_SONGS
} from "./actions";

const modifyPlaylistInitialState = {
    playlist: {},
    songs: [],
    isSaving: false,
    selectedSongs: []
};

export const modifyPlaylist = (state = modifyPlaylistInitialState, action) => {
    switch (action.type) {
        case ON_SONG_CLICK: {
            const selectedSongs = state.selectedSongs.slice(0);
            if (action.checked) {
                selectedSongs.push(action.songId);
            } else {
                const index = selectedSongs.findIndex(id => id === action.songId);
                selectedSongs.splice(index, 1);
            }
            return Object.assign({}, state, {
                selectedSongs
            });
        }
        case SORT_SONGS:
            return Object.assign({}, state, {
                songs: state.songs
                    .slice(0)
                    .map(song => ({ ...song }))
                    .sort((song1, song2) => song1[action.sortOn] !== song2[action.sortOn] ? song1[action.sortOn] < song2[action.sortOn] ? -1 : 1 : 0)
            });
        case RECEIVE_LIBRARY:
            return Object.assign({}, state, {
                songs: action.songs
            });
        case RECEIVE_PLAYLIST_BY_ID:
            return Object.assign({}, state, {
                playlist: action.playlist,
                selectedSongs: action.playlist.songs
            });
        case RECEIVE_SONG_BY_ID:
            return Object.assign({}, state, {
                songs: [...state.songs, action.song]
            });
        case RECEIVE_SAVE_PLAYLIST:
            return Object.assign({}, state, {
                isSaving: !isNaN(action.playlistId)
            });
        case RESET_MODIFY_PLAYLIST:
            return modifyPlaylistInitialState;;
        default:
            return state;
    }
};
