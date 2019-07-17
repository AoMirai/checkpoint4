import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncFetchArtists, asyncFetchArtistAct} from '../../actions/artists'


class AdminArtist extends Component {

componentDidMount = () => {
  const { asyncFetchArtists, asyncFetchArtistAct, artists } = this.props
  const fectchArtists = new Promise((resolve, reject) => {
    resolve(asyncFetchArtists())
    reject('reject')
  })
  fectchArtists.then(() => {
    console.log('cdm');
    for (let i = 0; i < artists.length; i =+ 1) {
      const artist = artists[i];
      asyncFetchArtistAct(artist.id)      
    }
  })
  .catch(err => {
    console.log(err);
    
  })
  
}


  render() {
    const { artists } = this.props
    return (
      <div className="AdminArtist">
        {console.log(artists)
        }
        Admin Artist
        {artists.map(artist => (
          <div>
            {artist.firstname}
            {' '}
            {artist.lastname}
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  artists: state.artists.artists
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchArtists, asyncFetchArtistAct
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(AdminArtist);