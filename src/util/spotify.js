
const clientID = 'e42bdf89af684178900839b4d9dacb90';
const redirectURI = 'http://localhost:3000/';

//const userId = '';
//const playlistId = '';
let userAccessToken = '';

const Spotify = {

getAccessToken() {
  if (userAccessToken) {
    return userAccessToken;
  }
    let url = window.location.href;
    let accessToken = url.match(/access_token=([^&]*)/)
    let expiresIn = url.match(/expires_in=([^&]*)/);

    if (accessToken && expiresIn){
      userAccessToken = accessToken[1];
      const expirationTime = Number(expiresIn[1]) * 1000;
      window.setTimeout(() => userAccessToken = '', expirationTime);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    } else {
         window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`)
      }
    },


search(term) {
const accessToken = this.getAccessToken();

  return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
  {headers: {Authorization: `Bearer ${accessToken}` }}
  ).then(response => response.json()
  ).then(jsonResponse => {
  console.log('this response'+ jsonResponse);

    if (!jsonResponse.tracks) {
      return [];
    }

    return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));

  });
  },



savePlayList(playlistName, tracks) {
// get the userid and track list
  if(!playlistName || !tracks) {
    return;
  }

    const accessToken = this.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`}

    return fetch("https://api.spotify.com/v1/me",
    {headers: headers})
    .then(response =>  response.json())
    .then(jsonResponse => jsonResponse.id)

//create new playlist and get its id
    .then(userId => {
      fetch(`https://api.spotify.com//v1/users/${userId}/playlists`,
        {headers: {
          Authorization: `Bearer ${accessToken}`,
          //ContentType: 'application/json'
        },
        method: 'POST',
        body:JSON.stringify({name: playlistName})
      })
    .then(response => response.json())
    .then(jsonResponse => {
      let playlistId = jsonResponse.id
//add tracks to a playlist
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}tracks`,
          {headers: {
            Authorization: `Bearer ${accessToken}`,
          //  ContentType: 'application/json'
            },
          method: 'POST',
          body:JSON.stringify({uris: tracks})
        })
      })
    //.then(response => response.json())
  //  .then(jsonResponse => jsonResponse.id)
  })
}
}

export default Spotify;
