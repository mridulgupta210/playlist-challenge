const apiService = (function () {
    const createApiUrl = baseUrl => {
        const apiUrl = 'http://localhost:5000/';

        return apiUrl + baseUrl;
    };

    return {
        getPlaylists: () => createApiUrl('playlist'),
        deletePlaylist: playlistId => createApiUrl(`playlist/${playlistId}`),
        getLibrary: () => createApiUrl('library'),
        getPlaylistById: playlistId => createApiUrl(`playlist/${playlistId}`),
        getSongById: songId => createApiUrl(`library/${songId}`),
        savePlaylist: () => createApiUrl('playlist'),
        updatePlaylist: playlistId => createApiUrl(`playlist/${playlistId}`)
    };
}());

export { apiService };
