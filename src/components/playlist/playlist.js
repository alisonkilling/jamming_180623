import React from 'react';
import './playlist.css';
import TrackList from '../tracklist/tracklist';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render () {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue="New Playlist"/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
        <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist;
