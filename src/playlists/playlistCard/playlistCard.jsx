import React, { } from 'react';
import './playlistCard.css';

export default function PlaylistCard(props) {
    const { playlist, onCardClick, onEditClick, onDeleteClick } = props;

    return (
        <article
            className="card"
            onClick={() => onCardClick(playlist.id)}>
            <h3 title={playlist.name}>{playlist.name}</h3>
            <p>{`${playlist.songs.length} songs`}</p>
            <div className="action-btns">
                <i className="fa fa-pencil fa-lg" onClick={event => onEditClick(event, playlist.id)} /> <br />
                <i className="fa fa-trash fa-lg" onClick={event => onDeleteClick(event, playlist.id)} />
            </div>
        </article>
    );
}
