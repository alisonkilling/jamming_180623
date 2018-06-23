import React from 'react';
import './tracklist.css';
import Track from '../track/track';

class TrackList extends React.Component {
  
  render () {
    return (
      <div className="TrackList">
      {
        Array.isArray(this.props.tracks) ? this.props.tracks.map(track => <Track key={track.id} track={track} onRemove={this.props.onRemove} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} />) : null
      }
      </div>
    );
  }
}

export default TrackList;




/*
import React from 'react';
import './tracklist.css';
import Track from '../track/track';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="TrackList">
      {
        this.props.tracks.map(track => {
         <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />
        })
      }
      </div>
    );
  }
}

export default TrackList;
*/
// previously also passed to Track isRemoval={this.props.isRemoval}

/*
this.props.tracks.map(track => {
return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />
})

this.props.tracks.map(track => {
return <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />
)} */
