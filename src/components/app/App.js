import React from 'react';
//import logo from './logo.svg';
import './app.css';
import SearchBar from '../searchbar/searchbar';
import SearchResults from '../searchresults/searchresults';
import Playlist from '../playlist/playlist';
import Spotify from '../../util/spotify'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
    this.state = {searchResults: [
      /*{
      name: 'Untrust us',
      artist: 'Crystal Castles',
      album: 'unknown',
      id: '05',
      uri: '05'
      },{
      name: 'Not in love',
      artist: 'Crystal Castles',
      album: 'unknown',
      id: '06',
      uri: '06'
    }*/
    ]};
    this.state.playlistName = '';
    this.state.playlistTracks = [
      /*{
      name: 'Get Lucky',
      artist: 'Daft Punk',
      album: 'unknown',
      id: '01',
      uri: '01'
    },{
      name: 'One more time',
      artist: 'Daft Punk',
      album: 'unknown',
      id: '02',
      uri: '02'
    },{
      name: 'Harder better faster stronger',
      artist: 'Daft Punk',
      album: 'unknown',
      id: '03',
      uri: '03'
    }*/
  ]
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    let output = tracks.find(savedTrack => savedTrack.id === track.id)

    if (!output) {
      tracks.push(track);
      this.setState ({playlistTracks: tracks})
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let filteredTracks = tracks.filter(selectedTrack => selectedTrack.id !== track.id);

    this.setState ({playlistTracks: filteredTracks});
    }


  updatePlaylistName(name) {
    this.setState ({playlistName: name});
  }

  savePlayList() {
    let tracks = this.state.playlistTracks;
    let trackURIs = tracks.map(track => track.uri)
    Spotify.savePlayList(this.state.playlistName, trackURIs)
    this.setState({playlistName: 'New Playlist', playlistTracks: []})
    }


  search(term) {
    Spotify.search(term)
  .then((tracks) => {
    this.setState({ searchResults: tracks });
  });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
          <SearchBar onSearch={this.search} />
            <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onSave={this.savePlayList} />
            </div>
          </div>
        </div>
      )}
    }

export default App;
