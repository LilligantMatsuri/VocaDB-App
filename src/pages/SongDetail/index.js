import React from 'react'
import { connect } from 'react-redux'
import SongDetailPage from './component'
import * as actions from './actions'
import { createSelector } from 'reselect';
import { selectSongResult } from './selector'

SongDetailPage.navigationOptions = () => ({
    title: 'Detail'
})

SongDetailPage.propTypes = {

}

const songDetailStateSelect = createSelector(
    selectSongResult(),
    (song) => ({ song })
);

const mapDispatchToProps = (dispatch, props) => ({
    fetchSong: id => dispatch(actions.getSong(id)),
    onPressArtist: artist => props.navigation.navigate('ArtistDetail', { id: artist.id }),
    onPressAlbum: album => props.navigation.navigate('AlbumDetail', { id: album.id }),
})

export default connect(songDetailStateSelect, mapDispatchToProps)(SongDetailPage)