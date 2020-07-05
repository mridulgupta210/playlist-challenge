import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestPlaylists, requestDeletePlaylist } from './actions';
import { Mode } from '../../common/services/constants';
import PlaylistCard from '../playlistCard/playlistCard.jsx';
import './viewPlaylists.css';

class ViewPlaylists extends Component {
    navigateToPlaylist = (mode, playlistId) => {
        this.props.history.push({
            pathname: `playlist${playlistId !== undefined ? `/${playlistId}` : ""}`,
            state: { mode }
        });
    }

    onDelete = (event, playlistId) => {
        event.stopPropagation();
        this.props.actions.requestDeletePlaylist(playlistId);
    }

    onEdit = (event, playlistId) => {
        event.stopPropagation();
        this.navigateToPlaylist(Mode.Edit, playlistId);
    }

    render() {
        const { playlists } = this.props;

        return (
            <div>
                {playlists.length === 0 ?
                    <section className="no-playlist">
                        You have no playlist as of now
                        <button className="btn btn-warning" onClick={() => this.navigateToPlaylist(Mode.Add)}>
                            Click here to add playlist
                        </button>
                    </section>
                    :
                    <>
                        <section>
                            <button className="btn btn-warning add-btn" onClick={() => this.navigateToPlaylist(Mode.Add)}>
                                Add Playlist
                            </button>
                        </section>

                        <section className="cards">
                            {playlists.map(playlist => (
                                <PlaylistCard
                                    key={playlist.id}
                                    playlist={playlist}
                                    onCardClick={playlistId => this.navigateToPlaylist(Mode.View, playlistId)}
                                    onEditClick={this.onEdit}
                                    onDeleteClick={this.onDelete} />
                            ))}
                        </section>
                    </>}
            </div >
        );
    }

    componentDidMount() {
        this.props.actions.requestPlaylists();
    }
}

const mapStateToProps = state => ({
    ...state.viewPlaylists
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        requestPlaylists,
        requestDeletePlaylist
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPlaylists);
