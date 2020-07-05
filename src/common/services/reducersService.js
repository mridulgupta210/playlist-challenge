import { loader } from "../components/loader/reducers";
import { viewPlaylists } from '../../playlists/viewPlaylists/reducers';
import { modifyPlaylist } from '../../playlists/modifyPlaylist/reducers';

const reducersService = (function () {
    return {
        getAllReducers: () => {
            return {
                loader, viewPlaylists, modifyPlaylist
            };
        }
    };
}());

export { reducersService };
